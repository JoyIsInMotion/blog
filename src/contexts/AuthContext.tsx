import { type Session } from '@supabase/supabase-js'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { AuthContext, type AuthContextValue } from './auth-context'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    if (!isSupabaseConfigured) {
      setLoading(false)
      return () => {
        mounted = false
      }
    }

    const initializeSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Failed to fetch session', error)
      }

      if (mounted) {
        setSession(data.session ?? null)
        setLoading(false)
      }
    }

    void initializeSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      signUp: async (email, password) => {
        if (!isSupabaseConfigured) {
          throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.')
        }
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      },
      signIn: async (email, password) => {
        if (!isSupabaseConfigured) {
          throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.')
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      },
      signOut: async () => {
        if (!isSupabaseConfigured) {
          throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.')
        }
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      },
    }),
    [loading, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
