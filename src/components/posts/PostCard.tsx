import { ArrowRight, CalendarDays, CircleUserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPostDate } from '../../lib/posts'
import { type Post } from '../../types'

type PostCardProps = {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_35px_rgba(15,23,42,0.08)] ring-1 ring-white transition duration-300 hover:-translate-y-1 hover:border-slate-300/80 hover:shadow-[0_25px_45px_rgba(15,23,42,0.16)] animate-fade-up">
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
          <CircleUserRound size={14} />
          {post.author_name ?? 'Guest author'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} />
          {formatPostDate(post.created_at)}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{post.excerpt}</p>

      <Link
        to={`/post/${post.id}`}
        className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition duration-200 group-hover:bg-cyan-600"
      >
        Read post
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </article>
  )
}
