import { Link } from 'react-router-dom'
import { formatPostDate, posts } from '../lib/posts'

export function HomePage() {
  return (
    <div className="w-full space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950 px-8 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] md:px-10 md:py-14">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Publishing platform</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Read the latest posts, then sign in to write your own.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
          Browse the current issue, open individual posts, and use the protected creation screens when you are ready to publish.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Latest posts</h2>
            <p className="mt-1 text-sm text-slate-600">{posts.length} published entries</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex h-full flex-col rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-sm ring-1 ring-slate-200/60 backdrop-blur"
            >
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                {post.author_name} · {formatPostDate(post.created_at)}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
              <Link
                to={`/post/${post.id}`}
                className="mt-6 inline-flex w-fit items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Read post
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}