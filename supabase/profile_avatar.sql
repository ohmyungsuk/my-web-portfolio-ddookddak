alter table public.profiles
add column if not exists avatar_url text default '';

alter table public.community_posts
add column if not exists author_id text default '';

alter table public.community_posts
add column if not exists author_avatar text default '';
