// User roles matching the profiles.role check constraint
export type UserRole = "foster" | "volunteer" | "adopter" | "staff" | "admin";

// Profiles (extends Supabase auth.users)
export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
}

// Forum Categories
export interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
}

// Forum Posts (with optional joined fields)
export interface ForumPost {
  id: string;
  author_id: string;
  category_id: number;
  title: string | null;
  body: string;
  images: string[];
  created_at: string;
  // Optional joined fields
  author?: Profile;
  category?: ForumCategory;
  comment_count?: number;
  reaction_count?: number;
}

// Forum Comments (with optional author)
export interface ForumComment {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  created_at: string;
  // Optional joined field
  author?: Profile;
}

// Forum Reactions
export interface ForumReaction {
  post_id: string;
  user_id: string;
  emoji: string;
}

// Training Modules
export interface TrainingModule {
  id: number;
  title: string;
  description: string | null;
  sort_order: number;
  published: boolean;
}

// Training Steps
export interface TrainingStep {
  id: number;
  module_id: number;
  step_number: number;
  title: string;
  body: string;
  image_url: string | null;
}

// Training status matching the training_progress.status check constraint
export type TrainingStatus = "not_started" | "in_progress" | "completed";

// Training Progress
export interface TrainingProgress {
  user_id: string;
  module_id: number;
  status: TrainingStatus;
  current_step: number;
  completed_at: string | null;
}

// Resource type matching the library_resources.type check constraint
export type ResourceType = "article" | "video" | "link";

// Library Resources
export interface LibraryResource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  type: ResourceType;
  url: string | null;
  content: string | null;
  created_at: string;
}
