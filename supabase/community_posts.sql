create table if not exists public.community_posts (
  id text primary key,
  category text not null,
  title text not null,
  content text not null,
  excerpt text default '',
  images jsonb not null default '[]'::jsonb,
  image text default '',
  author text default '뚝딱 회원',
  author_id text default '',
  author_avatar text default '',
  views integer not null default 0,
  likes integer not null default 0,
  liked boolean not null default false,
  comments integer not null default 0,
  comment_list jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.community_posts
add column if not exists author_id text default '';

alter table public.community_posts
add column if not exists author_avatar text default '';

alter table public.community_posts enable row level security;

drop policy if exists "community_posts_select_all" on public.community_posts;
create policy "community_posts_select_all"
on public.community_posts
for select
using (true);

drop policy if exists "community_posts_insert_all" on public.community_posts;
create policy "community_posts_insert_all"
on public.community_posts
for insert
with check (true);

drop policy if exists "community_posts_update_all" on public.community_posts;
create policy "community_posts_update_all"
on public.community_posts
for update
using (true)
with check (true);

drop policy if exists "community_posts_delete_all" on public.community_posts;
create policy "community_posts_delete_all"
on public.community_posts
for delete
using (true);
