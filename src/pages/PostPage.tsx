import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { formatPostDate, getPostById, getPostParagraphs } from '../lib/posts'

export function PostPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const post = getPostById(id)

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Post not found</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">That post does not exist.</h1>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
          Return home
        </Link>
      </section>
    )
  }

  const isOwner = user?.id === post.author_id

  return (
    <article className="mx-auto w-full max-w-4xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur md:p-10">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
        {post.author_name} · {formatPostDate(post.created_at)}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">{post.title}</h1>

      <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
        {getPostParagraphs(post.content).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {isOwner && (
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to={`/post/${post.id}/edit`} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
            Edit post
          </Link>
          <Link to={`/post/${post.id}/delete`} className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100">
            Delete post
          </Link>
        </div>
      )}
    </article>
  )
}