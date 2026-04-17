import { type FormEvent, useState } from 'react'
import { Save, Undo2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export type PostEditorValues = {
  title: string
  content: string
}

type PostEditorFormProps = {
  initialValues?: PostEditorValues
  onSubmit: (values: PostEditorValues) => Promise<void>
  submitting: boolean
  submitLabel: string
  cancelHref: string
  errorMessage?: string | null
}

const defaultValues: PostEditorValues = {
  title: '',
  content: '',
}

export function PostEditorForm({
  initialValues = defaultValues,
  onSubmit,
  submitting,
  submitLabel,
  cancelHref,
  errorMessage,
}: PostEditorFormProps) {
  const [title, setTitle] = useState(initialValues.title)
  const [content, setContent] = useState(initialValues.content)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit({ title: title.trim(), content: content.trim() })
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={(event) => void handleSubmit(event)}>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">Title</span>
        <input
          required
          minLength={4}
          maxLength={120}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          placeholder="Write a post title"
          type="text"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">Content</span>
        <textarea
          required
          minLength={40}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="min-h-64 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          placeholder="Start writing here..."
        />
      </label>

      {errorMessage ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          disabled={submitting}
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Save size={15} />
          {submitting ? 'Saving...' : submitLabel}
        </button>

        <Link
          to={cancelHref}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <Undo2 size={15} />
          Cancel
        </Link>
      </div>
    </form>
  )
}
