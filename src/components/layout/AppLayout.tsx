import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200',
  ].join(' ')

export function AppLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <p className="text-xl font-semibold tracking-tight text-slate-900">Blog</p>
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-2 rounded-full bg-white/70 p-1 shadow-sm backdrop-blur">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            {user ? (
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
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
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-12">
        <Outlet />
      </main>
    </div>
  )
}