import { isSupabaseConfigured, supabase } from './supabase'
import { type Post } from '../types'

type PostRow = {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
}

const demoPosts: Post[] = [
  {
    id: 'launching-the-first-issue',
    author_id: 'demo-author-1',
    author_name: 'Avery Reed',
    excerpt: 'A quick look at the publishing workflow, the editorial checklist, and why the first issue sets the tone.',
    title: 'Launching the First Issue',
    content:
      'The first issue is less about perfection and more about momentum. A clear publishing loop, a small set of repeatable sections, and an honest editorial checklist make it easier to ship on schedule.\n\nStart with a simple structure: a lead story, a short note from the editor, and one practical article readers can apply immediately. That rhythm gives the publication an identity without overcomplicating the process.\n\nOnce the cadence is stable, refine the voice. The best early improvements usually come from tightening the opening paragraph, trimming anything redundant, and making the closing idea explicit.',
    created_at: '2026-04-04T09:15:00.000Z',
  },
  {
    id: 'writing-for-readability',
    author_id: 'demo-author-2',
    author_name: 'Jordan Lee',
    excerpt: 'Readable posts are easier to scan, easier to trust, and easier to return to later.',
    title: 'Writing for Readability',
    content:
      'Readable posts make the reader feel oriented from the first line. Short paragraphs, descriptive headings, and one clear idea per section do more for comprehension than decorative language ever will.\n\nIf a sentence needs a second pass to decode, it is probably doing too much work. Cut it, split it, or move it into a supporting paragraph so the main point stays obvious.\n\nThe goal is not simplicity for its own sake. The goal is lowering friction so the reader can spend their attention on the idea instead of the structure.',
    created_at: '2026-04-08T16:40:00.000Z',
  },
  {
    id: 'designing-a-useful-editor',
    author_id: 'demo-author-1',
    author_name: 'Avery Reed',
    excerpt: 'A good editor makes the next action obvious and keeps the surface area small.',
    title: 'Designing a Useful Editor',
    content:
      'Useful editors feel calm. They surface the important fields first, keep destructive actions out of the way, and make save behavior predictable.\n\nA draft-friendly layout usually beats a dense form. Group the title and body together, then place ownership and status details where they support the work instead of interrupting it.\n\nWhen a page needs deletion, make the consequence explicit and the escape route obvious. People should never wonder what happens next.',
    created_at: '2026-04-12T11:05:00.000Z',
  },
]

const postDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function buildExcerpt(content: string) {
  const normalized = content.replace(/\s+/g, ' ').trim()

  if (normalized.length <= 140) {
    return normalized
  }

  return `${normalized.slice(0, 140)}...`
}

function formatAuthor(authorId: string) {
  return `Author ${authorId.slice(0, 8)}`
}

function mapRowToPost(row: PostRow): Post {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author_id: row.author_id,
    author_name: formatAuthor(row.author_id),
    created_at: row.created_at,
    excerpt: buildExcerpt(row.content),
  }
}

function ensureSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.')
  }
}

export async function getPosts() {
  if (!isSupabaseConfigured) {
    return demoPosts
  }

  const { data, error } = await supabase
    .from('posts')
    .select('id, title, content, author_id, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return ((data ?? []) as PostRow[]).map(mapRowToPost)
}

export async function getPostById(postId: string | undefined) {
  if (!postId) {
    return null
  }

  if (!isSupabaseConfigured) {
    return demoPosts.find((post) => post.id === postId) ?? null
  }

  const { data, error } = await supabase
    .from('posts')
    .select('id, title, content, author_id, created_at')
    .eq('id', postId)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data) {
    return null
  }

  return mapRowToPost(data as PostRow)
}

export async function createPost(input: { title: string; content: string; authorId: string }) {
  ensureSupabaseConfigured()

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: input.title,
      content: input.content,
      author_id: input.authorId,
    })
    .select('id, title, content, author_id, created_at')
    .single()

  if (error) {
    throw error
  }

  return mapRowToPost(data as PostRow)
}

export async function updatePost(input: { id: string; title: string; content: string; authorId: string }) {
  ensureSupabaseConfigured()

  const { data, error } = await supabase
    .from('posts')
    .update({
      title: input.title,
      content: input.content,
    })
    .eq('id', input.id)
    .eq('author_id', input.authorId)
    .select('id, title, content, author_id, created_at')

  if (error) {
    throw error
  }

  if (!data.length) {
    throw new Error('Post not found or you do not have permission to edit it.')
  }

  return mapRowToPost(data[0] as PostRow)
}

export async function deletePost(input: { id: string; authorId: string }) {
  ensureSupabaseConfigured()

  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', input.id)
    .eq('author_id', input.authorId)
    .select('id')

  if (error) {
    throw error
  }

  if (!data.length) {
    throw new Error('Post not found or you do not have permission to delete it.')
  }

  return true
}

export function formatPostDate(value: string) {
  return postDateFormatter.format(new Date(value))
}

export function getPostParagraphs(content: string) {
  return content.split(/\n\n+/).filter(Boolean)
}