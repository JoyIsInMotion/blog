import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setSubmitting(true)

    try {
      await signIn(email, password)
      const redirectPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
      navigate(redirectPath ?? '/dashboard', { replace: true })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/70">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Login</h1>
      <p className="mt-2 text-sm text-slate-600">Welcome back to your blog dashboard.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1 block text-sm text-slate-700">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-indigo-200 focus:ring"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-slate-700">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-indigo-200 focus:ring"
          />
        </label>

        {errorMessage && (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
        )}

        <button
          disabled={submitting}
          type="submit"
          className="w-full rounded-xl bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        New here?{' '}
        <Link to="/register" className="font-medium text-indigo-700 hover:text-indigo-900">
          Create an account
        </Link>
      </p>
    </section>
  )
}
