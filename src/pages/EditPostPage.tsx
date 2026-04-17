import { FilePenLine } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PostEditorForm, type PostEditorValues } from '../components/posts/PostEditorForm'
import { useAuth } from '../hooks/useAuth'
import { getPostById, updatePost } from '../lib/posts'
import { type Post } from '../types'

export function EditPostPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      setErrorMessage(null)

      try {
        const data = await getPostById(id)
        setPost(data)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load post')
      } finally {
        setLoading(false)
      }
    }

    void loadPost()
  }, [id])

  const isOwner = useMemo(() => {
    if (!user || !post) {
      return false
    }

    return user.id === post.author_id
  }, [post, user])

  const handleSubmit = async (values: PostEditorValues) => {
    if (!user || !post) {
      setErrorMessage('Unable to verify ownership for this post.')
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    try {
      const updated = await updatePost({
        id: post.id,
        title: values.title,
        content: values.content,
        authorId: user.id,
      })

      navigate(`/post/${updated.id}`, { replace: true })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save post')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Loading post</p>
        <p className="mt-4 text-slate-700">Fetching content for editing...</p>
      </section>
    )
  }

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

  if (!isOwner) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-amber-200 bg-amber-50/90 p-8 shadow-sm ring-1 ring-amber-100 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Owner only</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">You can only edit your own posts.</h1>
        <Link to={`/post/${post.id}`} className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
          Back to post
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-4xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur md:p-10">
      <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-slate-500">
        <FilePenLine size={15} />
        Protected route
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Edit post</h1>
      <p className="mt-4 max-w-2xl text-slate-600">Update your content and save changes. Ownership is validated before persisting updates.</p>

      <PostEditorForm
        key={post.id}
        initialValues={{
          title: post.title,
          content: post.content,
        }}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Save changes"
        cancelHref={`/post/${post.id}`}
        errorMessage={errorMessage}
      />
    </section>
  )
}