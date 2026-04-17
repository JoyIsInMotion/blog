import { LayoutDashboard, PenSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPostDate, getPosts } from '../lib/posts'
import { useAuth } from '../hooks/useAuth'
import { type Post } from '../types'

export function DashboardPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadMyPosts = async () => {
      if (!user) {
        setPosts([])
        setLoading(false)
        return
      }

      setLoading(true)
      setErrorMessage(null)

      try {
        const allPosts = await getPosts()
        setPosts(allPosts.filter((post) => post.author_id === user.id))
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load dashboard posts')
      } finally {
        setLoading(false)
      }
    }

    void loadMyPosts()
  }, [user])

  return (
    <section className="w-full space-y-6 rounded-3xl border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/70 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-slate-500">
            <LayoutDashboard size={15} />
            Dashboard
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Your posts</h1>
          <p className="mt-2 max-w-2xl text-slate-600">Manage your published articles. You can edit or remove only the posts you own.</p>
        </div>

        <Link
          to="/post/new"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          <PenSquare size={15} />
          New post
        </Link>
      </div>

      {errorMessage ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</p> : null}

      {loading ? <p className="text-slate-600">Loading your posts...</p> : null}

      {!loading && !posts.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
          You have not published any posts yet.
        </div>
      ) : null}

      {!loading && posts.length ? (
        <div className="space-y-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-300">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{post.title}</h2>
                <p className="text-sm text-slate-500">Published {formatPostDate(post.created_at)}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link to={`/post/${post.id}`} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                  View
                </Link>
                <Link to={`/post/${post.id}/edit`} className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100">
                  Edit
                </Link>
                <Link to={`/post/${post.id}/delete`} className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-100">
                  Delete
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
