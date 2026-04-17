import { PenSquare } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostEditorForm, type PostEditorValues } from '../components/posts/PostEditorForm'
import { useAuth } from '../hooks/useAuth'
import { createPost } from '../lib/posts'

export function NewPostPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (values: PostEditorValues) => {
    if (!user) {
      setErrorMessage('You must be signed in to publish a post.')
      return
    }

    setErrorMessage(null)
    setSubmitting(true)

    try {
      const createdPost = await createPost({
        title: values.title,
        content: values.content,
        authorId: user.id,
      })

      navigate(`/post/${createdPost.id}`, { replace: true })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to publish post')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur md:p-10">
      <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-slate-500">
        <PenSquare size={15} />
        Protected route
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Create a post</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Publish a new article as a logged-in author. Your post will immediately appear on the public feed.
      </p>

      <PostEditorForm
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Publish post"
        cancelHref="/"
        errorMessage={errorMessage}
      />
    </section>
  )
}