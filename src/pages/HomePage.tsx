import { Newspaper, PenLine, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PostCard } from '../components/posts/PostCard'
import { getPosts } from '../lib/posts'
import { type Post } from '../types'

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      setErrorMessage(null)

      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load posts')
      } finally {
        setLoading(false)
      }
    }

    void loadPosts()
  }, [])

  return (
    <div className="w-full space-y-9">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-[linear-gradient(130deg,#082f49_0%,#0f172a_52%,#155e75_100%)] px-8 py-12 text-white shadow-[0_30px_90px_rgba(8,47,73,0.35)] md:px-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-16 top-5 h-44 w-44 animate-pulse rounded-full bg-cyan-400/20 blur-2xl" />
          <div className="absolute -right-10 bottom-3 h-40 w-40 animate-pulse rounded-full bg-sky-300/20 blur-2xl" />
        </div>

        <p className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
          <Sparkles size={14} />
          Publishing platform
        </p>
        <h1 className="relative mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Read stories freely. Sign in and publish your own.
        </h1>
        <p className="relative mt-5 max-w-2xl text-base leading-7 text-cyan-50 md:text-lg">
          Visitors can browse posts, while authenticated authors get protected creation and editing tools with ownership-based controls.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-cyan-100"
          >
            <PenLine size={15} />
            Start writing
          </Link>
          <a href="#latest-posts" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
            <Newspaper size={15} />
            Browse latest
          </a>
        </div>
      </section>

      <section id="latest-posts" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Latest posts</h2>
            <p className="mt-1 text-sm text-slate-600">
              {loading ? 'Loading posts...' : `${posts.length} published entries`}
            </p>
          </div>
        </div>

        {errorMessage ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</p> : null}

        {!loading && !posts.length ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-slate-600">
            No posts yet. Register and publish the first story.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}