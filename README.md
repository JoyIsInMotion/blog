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

If these variables are missing, the app now shows a setup banner and auth actions return a clear configuration error instead of crashing at startup.

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

## Supabase MCP Setup (VS Code Workspace)

This workspace includes MCP server config at .vscode/mcp.json for project ref gcywluwuehxknefzxige.

1. Create a Supabase Personal Access Token in Supabase Dashboard: Account -> Access Tokens.
2. Set it in your shell before starting MCP clients:

```powershell
$env:SUPABASE_ACCESS_TOKEN="your_pat_here"
```

3. Ensure MCP is enabled in VS Code and load the workspace server from .vscode/mcp.json.

Security note: do not commit tokens in code or config files.
