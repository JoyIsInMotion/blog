import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { isSupabaseConfigured } from '../../lib/supabase'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-700 hover:bg-white/80 hover:text-slate-950',
  ].join(' ')

export function AppLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen">
      {!isSupabaseConfigured && (
        <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-sm text-amber-900">
          <p className="mx-auto max-w-6xl">
            Supabase is not configured. Copy .env.example to .env and set VITE_SUPABASE_URL and
            VITE_SUPABASE_ANON_KEY.
          </p>
        </div>
      )}

      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="brand text-2xl font-semibold tracking-[0.18em] text-slate-950 uppercase">
            Northstar Blog
          </Link>

          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            <nav className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/75 p-1 shadow-sm">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
              {user ? (
                <>
                  <NavLink to="/post/new" className={linkClass}>
                    Write post
                  </NavLink>
                  <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={linkClass}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={linkClass}>
                    Register
                  </NavLink>
                </>
              )}
            </nav>

            {user && (
              <button
                type="button"
                onClick={() => void signOut()}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/60 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>Northstar Blog</p>
          <p>Routes, authoring screens, and protected post actions are ready to wire to persistence.</p>
        </div>
      </footer>
    </div>
  )
}