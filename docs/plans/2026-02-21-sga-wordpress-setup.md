# SGA WordPress Environment Setup — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stand up a local WordPress development environment using Bedrock + Docker, with Gutenverse and a free FSE theme, deployed via GitHub Actions to Azure.

**Architecture:** Bedrock (Roots) manages WordPress as a Composer project. Docker Compose runs WordPress + MySQL locally. GitHub repo is source of truth for infrastructure and configuration. Content lives in the database (WordPress admin).

**Tech Stack:** Bedrock, Docker Compose, PHP 8.2, MySQL 8.0, Composer, WP-CLI, Gutenverse, GitHub Actions, Azure Bicep

**Prerequisites:** Docker Desktop installed and running (`brew install --cask docker`, then open it once to complete setup)

---

## Task 1: Create the GitHub Repository

**Step 1: Create the repo on GitHub**

Run:
```bash
gh repo create dsayed/sga-wordpress --public --description "SGA public website — WordPress on Bedrock" --clone
```

Expected: New repo created, cloned to `~/repos/sga-wordpress` (or current directory)

**Step 2: Navigate to the repo**

Run:
```bash
cd ~/repos/sga-wordpress
```

**Step 3: Commit**

No commit yet — repo is empty. Move to Task 2.

---

## Task 2: Scaffold Bedrock with Composer (via Docker)

Since we're not installing PHP/Composer locally, use a throwaway Docker container.

**Step 1: Scaffold Bedrock into a temp directory**

Run from the parent directory (`~/repos/`):
```bash
docker run --rm -v $(pwd):/app -w /app composer create-project roots/bedrock sga-wordpress-tmp
```

Expected: Bedrock project scaffolded in `sga-wordpress-tmp/` with `composer.json`, `composer.lock`, `config/`, `web/`, `vendor/`, etc.

**Step 2: Move Bedrock files into the repo**

Run:
```bash
cp -a ~/repos/sga-wordpress-tmp/. ~/repos/sga-wordpress/
rm -rf ~/repos/sga-wordpress-tmp
cd ~/repos/sga-wordpress
```

Expected: `sga-wordpress` now contains the full Bedrock structure.

**Step 3: Verify the structure**

Run:
```bash
ls -la ~/repos/sga-wordpress
```

Expected: Should see `composer.json`, `composer.lock`, `config/`, `web/`, `vendor/`, `.env.example`, `wp-cli.yml`

**Step 4: Create .env from template**

Run:
```bash
cp .env.example .env
```

We'll configure the values in Task 3 when Docker Compose defines the database.

**Step 5: Initial commit**

```bash
git add -A
git commit -m "chore: scaffold Bedrock project

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push -u origin main
```

---

## Task 3: Add Docker Compose

**Files:**
- Create: `docker-compose.yml`
- Create: `Dockerfile`
- Modify: `.env`

**Step 1: Create the Dockerfile**

The official WordPress image doesn't match Bedrock's directory structure, so we use a PHP image and configure it for Bedrock.

Create `Dockerfile`:
```dockerfile
FROM php:8.2-apache

# Install PHP extensions required by WordPress
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable Apache mod_rewrite for WordPress permalinks
RUN a2enmod rewrite

# Set the document root to Bedrock's web/ directory
ENV APACHE_DOCUMENT_ROOT=/var/www/html/web
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Allow .htaccess overrides
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

WORKDIR /var/www/html
```

**Step 2: Create docker-compose.yml**

Create `docker-compose.yml`:
```yaml
services:
  db:
    image: mysql:8.0
    container_name: sga_db
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: sga_wordpress
      MYSQL_USER: sga
      MYSQL_PASSWORD: sga_pass
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - "3306:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 5s
      retries: 5

  wordpress:
    build: .
    container_name: sga_wp
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - .:/var/www/html
    ports:
      - "8080:80"

  wpcli:
    image: wordpress:cli
    depends_on:
      db:
        condition: service_healthy
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: sga_wordpress
      WORDPRESS_DB_USER: sga
      WORDPRESS_DB_PASSWORD: sga_pass
    volumes:
      - .:/var/www/html
    working_dir: /var/www/html/web
    entrypoint: ["wp", "--allow-root"]
    profiles:
      - cli

volumes:
  db_data:
```

**Step 3: Configure .env for Docker**

Edit `.env` to match the Docker database service:
```bash
DB_NAME='sga_wordpress'
DB_USER='sga'
DB_PASSWORD='sga_pass'
DB_HOST='db'

WP_ENV='development'
WP_HOME='http://localhost:8080'
WP_SITEURL="${WP_HOME}/wp"

# Generate these: https://roots.io/salts.html
# Or run: wp dotenv salts regenerate
```

Note: Auth salts need to be generated. We'll do this in Task 4.

**Step 4: Add .env to .gitignore check**

Bedrock's `.gitignore` should already ignore `.env`. Verify:
```bash
grep "^\.env$" .gitignore
```

Expected: `.env` is listed (Bedrock includes this by default).

**Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml
git commit -m "feat: add Docker Compose for local development

PHP 8.2 + Apache + MySQL 8.0. Includes WP-CLI service.
Matches planned Azure App Service environment.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

---

## Task 4: First Boot — Verify WordPress Runs

**Step 1: Start the containers**

Run:
```bash
docker compose up -d --build
```

Expected: Two containers start — `sga_db` and `sga_wp`. No errors.

**Step 2: Check containers are running**

Run:
```bash
docker compose ps
```

Expected: Both services show "Up" / "healthy".

**Step 3: Generate auth salts**

Run:
```bash
docker compose run --rm wpcli dotenv salts regenerate
```

If that doesn't work with Bedrock's WP-CLI setup, manually generate salts at https://roots.io/salts.html and paste them into `.env`.

**Step 4: Open WordPress in browser**

Navigate to: `http://localhost:8080`

Expected: WordPress installation wizard (language selection, then site title / admin user setup).

**Step 5: Complete WordPress install via WP-CLI**

Instead of clicking through the wizard, script it:
```bash
docker compose run --rm wpcli core install \
  --url="http://localhost:8080" \
  --title="Saving Great Animals" \
  --admin_user="admin" \
  --admin_password="admin" \
  --admin_email="admin@example.com" \
  --path="/var/www/html/web/wp"
```

Expected: "Success: WordPress installed successfully."

**Step 6: Verify in browser**

Navigate to: `http://localhost:8080`

Expected: Default WordPress site with "Saving Great Animals" as the title.

Navigate to: `http://localhost:8080/wp/wp-admin`

Expected: WordPress admin dashboard (login with admin/admin).

**Step 7: Commit (no new files — .env is gitignored)**

Nothing to commit from this task unless you modified tracked files.

---

## Task 5: Install Gutenverse + Free FSE Theme via Composer

**Step 1: Add Gutenverse plugin**

Run:
```bash
docker run --rm -v $(pwd):/app -w /app composer require wpackagist-plugin/gutenverse
```

Expected: Gutenverse downloaded to `web/app/plugins/gutenverse/`, `composer.json` and `composer.lock` updated.

**Step 2: Add Twenty Twenty-Five theme (free FSE theme)**

Run:
```bash
docker run --rm -v $(pwd):/app -w /app composer require wpackagist-theme/twentytwentyfive
```

Expected: Theme downloaded to `web/app/themes/twentytwentyfive/`.

**Step 3: Activate theme and plugin via WP-CLI**

Run:
```bash
docker compose run --rm wpcli theme activate twentytwentyfive --path="/var/www/html/web/wp"
docker compose run --rm wpcli plugin activate gutenverse --path="/var/www/html/web/wp"
```

Expected: "Success: Switched to 'Twenty Twenty-Five' theme." and "Plugin 'gutenverse' activated."

**Step 4: Verify in browser**

Navigate to: `http://localhost:8080`

Expected: Site now displays with Twenty Twenty-Five theme. Gutenverse blocks available in the editor.

**Step 5: Commit**

```bash
git add composer.json composer.lock
git commit -m "feat: add Gutenverse plugin and Twenty Twenty-Five theme

Gutenverse provides FSE blocks. TwentyTwentyFive is the placeholder
theme until Veterna is purchased.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

---

## Task 6: Write the WP-CLI Setup Script

This script bootstraps a fresh WordPress install so anyone (or CI) can go from `docker compose up` to a configured site in one command.

**Files:**
- Create: `scripts/setup.sh`

**Step 1: Create the scripts directory and setup script**

Create `scripts/setup.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail

# SGA WordPress Setup Script
# Bootstraps a fresh WordPress install with the correct theme, plugins, and settings.
# Usage: docker compose run --rm wpcli --path=/var/www/html/web/wp eval 'echo "db ok";'
#        Then: docker compose run --rm -v $(pwd)/scripts:/scripts --entrypoint /scripts/setup.sh wpcli

WP="wp --allow-root --path=/var/www/html/web/wp"

echo "=== SGA WordPress Setup ==="

# Wait for database
echo "Waiting for database..."
until $WP db check > /dev/null 2>&1; do
  sleep 2
done
echo "Database ready."

# Install WordPress if not already installed
if ! $WP core is-installed 2>/dev/null; then
  echo "Installing WordPress..."
  $WP core install \
    --url="http://localhost:8080" \
    --title="Saving Great Animals" \
    --admin_user="admin" \
    --admin_password="admin" \
    --admin_email="admin@example.com"
  echo "WordPress installed."
else
  echo "WordPress already installed, skipping."
fi

# Activate theme
echo "Activating theme..."
$WP theme activate twentytwentyfive

# Activate plugins
echo "Activating plugins..."
$WP plugin activate gutenverse

# Set basic options
echo "Configuring site options..."
$WP option update blogdescription "The Right Dog For The Right Home"
$WP option update timezone_string "America/Los_Angeles"
$WP option update date_format "F j, Y"
$WP option update permalink_structure "/%postname%/"

# Remove default content
echo "Cleaning default content..."
$WP post delete 1 --force 2>/dev/null || true  # "Hello World" post
$WP post delete 2 --force 2>/dev/null || true  # Sample page
$WP comment delete 1 --force 2>/dev/null || true  # Default comment

echo "=== Setup complete ==="
echo "Site: http://localhost:8080"
echo "Admin: http://localhost:8080/wp/wp-admin (admin / admin)"
```

**Step 2: Make it executable**

Run:
```bash
chmod +x scripts/setup.sh
```

**Step 3: Test the script**

First, tear down and rebuild to test from scratch:
```bash
docker compose down -v
docker compose up -d --build
sleep 10
docker compose run --rm -v $(pwd)/scripts:/scripts --entrypoint sh wpcli /scripts/setup.sh
```

Expected: Script runs through each step, ends with "Setup complete."

**Step 4: Verify in browser**

Navigate to: `http://localhost:8080`

Expected: Clean WordPress site with Twenty Twenty-Five theme, "Saving Great Animals" title, "The Right Dog For The Right Home" tagline, no default posts.

**Step 5: Commit**

```bash
git add scripts/setup.sh
git commit -m "feat: add WP-CLI setup script for bootstrapping

One command to go from fresh containers to configured WordPress.
Sets theme, plugins, timezone, permalinks, and removes default content.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

---

## Task 7: Add a README

**Files:**
- Create: `README.md`

**Step 1: Create README**

Create `README.md`:
```markdown
# SGA WordPress

Public website for [Saving Great Animals](https://savinggreatanimals.org), a dog rescue in Seattle.

## Quick Start

Prerequisites: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
# Clone and start
git clone https://github.com/dsayed/sga-wordpress.git
cd sga-wordpress
cp .env.example .env

# Start containers
docker compose up -d --build

# Run setup script (installs WordPress, activates theme/plugins)
docker compose run --rm -v $(pwd)/scripts:/scripts --entrypoint sh wpcli /scripts/setup.sh
```

Site: http://localhost:8080
Admin: http://localhost:8080/wp/wp-admin (admin / admin)

## Architecture

- **[Bedrock](https://roots.io/bedrock/)** — WordPress as a Composer-managed project
- **Docker Compose** — local development (PHP 8.2 + MySQL 8.0)
- **Gutenverse** — FSE block library
- **GitHub Actions** — deployment to Azure (planned)

See [organizational personas and development approach](https://github.com/dsayed/sga-community/blob/main/docs/plans/2026-02-21-sga-org-personas.md) for full context.

## Commands

```bash
docker compose up -d           # Start containers
docker compose down            # Stop containers
docker compose down -v         # Stop and delete database
docker compose logs wordpress  # View WordPress logs

# WP-CLI
docker compose run --rm wpcli theme list --path=/var/www/html/web/wp
docker compose run --rm wpcli plugin list --path=/var/www/html/web/wp
```
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with quick start and architecture

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

---

## Task 8: Add .claude/ Project Configuration (Optional)

Set up Claude Code context for the new repo so future sessions have the right context.

**Files:**
- Create: `.claude/settings.json`
- Create: `CLAUDE.md`

**Step 1: Create CLAUDE.md**

Create `CLAUDE.md`:
```markdown
# SGA WordPress

Public website for Saving Great Animals, a Seattle-based dog rescue.

## Project Context
- **Bedrock** (Roots) — WordPress managed via Composer
- **Docker Compose** — local dev environment
- **Gutenverse** — FSE block library for the theme
- **Target theme** — Veterna FSE (not yet purchased; using Twenty Twenty-Five as placeholder)
- **Companion repo** — github.com/dsayed/sga-community (community app, docs, prototypes)

## Key Commands
- `docker compose up -d --build` — start local environment
- `docker compose down -v` — tear down (including database)
- `docker compose run --rm wpcli <command> --path=/var/www/html/web/wp` — run WP-CLI
- `docker run --rm -v $(pwd):/app -w /app composer <command>` — run Composer

## File Structure
- `web/app/themes/` — themes (Composer-managed)
- `web/app/plugins/` — plugins (Composer-managed)
- `config/application.php` — WordPress config (reads from .env)
- `scripts/setup.sh` — bootstraps fresh install
- `.env` — local environment variables (not committed)
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add Claude Code project context

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

---

## Future Tasks (Not in This Plan)

These are deferred until the local environment is validated:

- **GitHub Actions deploy pipeline** — `git push` → Azure App Service
- **Azure Bicep infrastructure** — App Service + MySQL defined in code
- **Import SGA content** — when the site export is available from Jacintha/Alice Wonder
- **Install Veterna theme** — when purchased, add to `web/app/themes/veterna/`
- **Baseline content export** — after importing real content, export as XML for the repo
