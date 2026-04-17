import { Link, useParams } from 'react-router-dom'
import { getPostById } from '../lib/posts'

export function EditPostPage() {
  const { id } = useParams()
  const post = getPostById(id)

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Post not found</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">No post is available to edit.</h1>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
          Return home
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-4xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur md:p-10">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Protected route</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Edit post</h1>
      <p className="mt-4 max-w-2xl text-slate-600">The form is preloaded with the current post content and ready to connect to persistence later.</p>

      <form className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Title</span>
          <input defaultValue={post.title} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" type="text" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Excerpt</span>
          <input defaultValue={post.excerpt} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" type="text" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Content</span>
          <textarea defaultValue={post.content} className="min-h-56 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" />
        </label>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white opacity-70">
            Save changes
          </button>
          <Link to={`/post/${post.id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Back to post
          </Link>
        </div>
      </form>
    </section>
  )
}