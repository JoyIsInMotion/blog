import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/70">
        <p className="text-slate-700">Checking your session...</p>
      </section>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
