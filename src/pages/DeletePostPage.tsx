import { AlertTriangle, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { deletePost, getPostById } from '../lib/posts'
import { type Post } from '../types'

export function DeletePostPage() {
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

  const handleDelete = async () => {
    if (!user || !post) {
      setErrorMessage('Unable to verify ownership for this post.')
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    try {
      await deletePost({
        id: post.id,
        authorId: user.id,
      })

      navigate('/dashboard', { replace: true })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete post')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Loading post</p>
        <p className="mt-4 text-slate-700">Preparing delete confirmation...</p>
      </section>
    )
  }

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

  if (!isOwner) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-amber-200 bg-amber-50/90 p-8 shadow-sm ring-1 ring-amber-100 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Owner only</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">You can only delete your own posts.</h1>
        <Link to={`/post/${post.id}`} className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
          Back to post
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-rose-200 bg-rose-50/80 p-8 shadow-sm ring-1 ring-rose-100 backdrop-blur md:p-10">
      <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-rose-600">
        <AlertTriangle size={15} />
        Danger zone
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Delete “{post.title}”?</h1>
      <p className="mt-4 max-w-2xl text-slate-700">
        This action is permanent. The post will be removed for all visitors and cannot be recovered.
      </p>

      {errorMessage ? <p className="mt-6 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm text-rose-700">{errorMessage}</p> : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          disabled={submitting}
          type="button"
          onClick={() => void handleDelete()}
          className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Trash2 size={15} />
          {submitting ? 'Deleting...' : 'Delete post'}
        </button>
        <Link to={`/post/${post.id}`} className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100">
          Cancel
        </Link>
      </div>
    </section>
  )
}