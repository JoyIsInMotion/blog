-- Phase 1 baseline schema for blog posts
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "Posts are public readable" on public.posts;
create policy "Posts are public readable"
on public.posts for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can insert own posts" on public.posts;
create policy "Authenticated users can insert own posts"
on public.posts for insert
to authenticated
with check (auth.uid() = author_id);

drop policy if exists "Owners can update own posts" on public.posts;
create policy "Owners can update own posts"
on public.posts for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

drop policy if exists "Owners can delete own posts" on public.posts;
create policy "Owners can delete own posts"
on public.posts for delete
to authenticated
using (auth.uid() = author_id);
