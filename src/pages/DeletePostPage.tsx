import { Link, useParams } from 'react-router-dom'
import { getPostById } from '../lib/posts'

export function DeletePostPage() {
  const { id } = useParams()
  const post = getPostById(id)

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Post not found</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">No post is available to delete.</h1>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
          Return home
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-rose-200 bg-rose-50/80 p-8 shadow-sm ring-1 ring-rose-100 backdrop-blur md:p-10">
      <p className="text-sm uppercase tracking-[0.35em] text-rose-600">Danger zone</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Delete “{post.title}”?</h1>
      <p className="mt-4 max-w-2xl text-slate-700">
        This protected route is reserved for delete confirmation. Hook it to your persistence layer when you are ready to make removals permanent.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white opacity-70">
          Delete post
        </button>
        <Link to={`/post/${post.id}`} className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100">
          Cancel
        </Link>
      </div>
    </section>
  )
}