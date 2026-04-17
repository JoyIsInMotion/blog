-- Align posts schema and policies to project requirements.
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Keep the table strictly to required columns.
alter table if exists public.posts
  drop column if exists cover_image_url,
  drop column if exists updated_at;

drop trigger if exists trg_posts_updated_at on public.posts;
drop function if exists public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "Posts are public readable" on public.posts;
drop policy if exists "Authenticated users can insert own posts" on public.posts;
drop policy if exists "Owners can update own posts" on public.posts;
drop policy if exists "Owners can delete own posts" on public.posts;

drop policy if exists "posts_select_public" on public.posts;
create policy "posts_select_public"
on public.posts for select
to anon, authenticated
using (true);

drop policy if exists "posts_insert_authenticated" on public.posts;
create policy "posts_insert_authenticated"
on public.posts for insert
to authenticated
with check (auth.uid() = author_id);

drop policy if exists "posts_update_owner" on public.posts;
create policy "posts_update_owner"
on public.posts for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

drop policy if exists "posts_delete_owner" on public.posts;
create policy "posts_delete_owner"
on public.posts for delete
to authenticated
using (auth.uid() = author_id);

create index if not exists idx_posts_author_id on public.posts(author_id);
create index if not exists idx_posts_created_at on public.posts(created_at desc);
