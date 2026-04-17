# Blog Frontend

A Vite + React + TypeScript frontend for a Supabase-backed blog system.

## Stack

- Vite + React + TypeScript
- Tailwind CSS (via Vite plugin)
- React Router
- Supabase JavaScript client

## Phase 1 Scope

- Public pages and shared layout
- Email/password registration and login
- Auth provider with session hydration
- Protected route guard for authenticated screens

## Environment Setup

1. Copy .env.example to .env.
2. Fill in your Supabase project values:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

## Run Locally

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run build
npm run lint
```

## Database

Migration files are in supabase/migrations.

Apply the SQL in your Supabase project to create the posts table and row-level security policies.
