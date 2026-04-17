import { Link } from 'react-router-dom'

export function NewPostPage() {
  return (
    <section className="mx-auto w-full max-w-4xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur md:p-10">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Protected route</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Create a post</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        This screen is ready for your editor and publish action. For now it is an empty authoring shell protected by login.
      </p>

      <form className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Title</span>
          <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" placeholder="Write a post title" type="text" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Excerpt</span>
          <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" placeholder="Short summary for the home page" type="text" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Content</span>
          <textarea className="min-h-56 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" placeholder="Start writing here..." />
        </label>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white opacity-70">
            Publish draft
          </button>
          <Link to="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  )
}