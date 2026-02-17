-- Profiles (extends Supabase auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('foster','volunteer','adopter','staff','admin')),
  location text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Profiles: users can read all profiles, update own
create policy "Profiles are viewable by authenticated users" on profiles
  for select to authenticated using (true);
create policy "Users can update own profile" on profiles
  for update to authenticated using (auth.uid() = id);

-- Forum Categories
create table forum_categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  sort_order int default 0
);

alter table forum_categories enable row level security;
create policy "Forum categories are viewable by authenticated users" on forum_categories
  for select to authenticated using (true);

-- Forum Posts
create table forum_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) not null,
  category_id int references forum_categories(id) not null,
  title text,
  body text not null,
  images text[] default '{}',
  created_at timestamptz default now()
);

alter table forum_posts enable row level security;
create policy "Forum posts are viewable by authenticated users" on forum_posts
  for select to authenticated using (true);
create policy "Authenticated users can create forum posts" on forum_posts
  for insert to authenticated with check (auth.uid() = author_id);
create policy "Users can update own forum posts" on forum_posts
  for update to authenticated using (auth.uid() = author_id);

-- Forum Comments
create table forum_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references forum_posts(id) on delete cascade not null,
  author_id uuid references profiles(id) not null,
  body text not null,
  created_at timestamptz default now()
);

alter table forum_comments enable row level security;
create policy "Forum comments are viewable by authenticated users" on forum_comments
  for select to authenticated using (true);
create policy "Authenticated users can create comments" on forum_comments
  for insert to authenticated with check (auth.uid() = author_id);

-- Forum Reactions
create table forum_reactions (
  post_id uuid references forum_posts(id) on delete cascade,
  user_id uuid references profiles(id),
  emoji text not null default '❤️',
  primary key (post_id, user_id)
);

alter table forum_reactions enable row level security;
create policy "Reactions are viewable by authenticated users" on forum_reactions
  for select to authenticated using (true);
create policy "Users can manage own reactions" on forum_reactions
  for all to authenticated using (auth.uid() = user_id);

-- Training Modules
create table training_modules (
  id serial primary key,
  title text not null,
  description text,
  sort_order int default 0,
  published boolean default false
);

alter table training_modules enable row level security;
create policy "Published modules are viewable by authenticated users" on training_modules
  for select to authenticated using (published = true);
create policy "Staff can manage modules" on training_modules
  for all to authenticated using (
    exists (select 1 from profiles where id = auth.uid() and role in ('staff', 'admin'))
  );

-- Training Steps
create table training_steps (
  id serial primary key,
  module_id int references training_modules(id) on delete cascade not null,
  step_number int not null,
  title text not null,
  body text not null,
  image_url text,
  unique(module_id, step_number)
);

alter table training_steps enable row level security;
create policy "Steps are viewable by authenticated users" on training_steps
  for select to authenticated using (true);
create policy "Staff can manage steps" on training_steps
  for all to authenticated using (
    exists (select 1 from profiles where id = auth.uid() and role in ('staff', 'admin'))
  );

-- Training Progress
create table training_progress (
  user_id uuid references profiles(id),
  module_id int references training_modules(id),
  status text not null default 'not_started'
    check (status in ('not_started','in_progress','completed')),
  current_step int default 1,
  completed_at timestamptz,
  primary key (user_id, module_id)
);

alter table training_progress enable row level security;
create policy "Users can view own progress" on training_progress
  for select to authenticated using (auth.uid() = user_id);
create policy "Users can manage own progress" on training_progress
  for all to authenticated using (auth.uid() = user_id);
create policy "Staff can view all progress" on training_progress
  for select to authenticated using (
    exists (select 1 from profiles where id = auth.uid() and role in ('staff', 'admin'))
  );

-- Library Resources
create table library_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  type text not null check (type in ('article','video','link')),
  url text,
  content text,
  created_at timestamptz default now()
);

alter table library_resources enable row level security;
create policy "Library resources are viewable by authenticated users" on library_resources
  for select to authenticated using (true);
create policy "Staff can manage resources" on library_resources
  for all to authenticated using (
    exists (select 1 from profiles where id = auth.uid() and role in ('staff', 'admin'))
  );

-- Full-text search index for Library
create index library_search_idx on library_resources
  using gin(to_tsvector('english', title || ' ' || coalesce(description, '')));
