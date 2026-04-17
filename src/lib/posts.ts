import { type Post } from '../types'

export const posts: Post[] = [
  {
    id: 'launching-the-first-issue',
    author_id: 'demo-author-1',
    author_name: 'Avery Reed',
    excerpt: 'A quick look at the publishing workflow, the editorial checklist, and why the first issue sets the tone.',
    title: 'Launching the First Issue',
    content:
      'The first issue is less about perfection and more about momentum. A clear publishing loop, a small set of repeatable sections, and an honest editorial checklist make it easier to ship on schedule.\n\nStart with a simple structure: a lead story, a short note from the editor, and one practical article readers can apply immediately. That rhythm gives the publication an identity without overcomplicating the process.\n\nOnce the cadence is stable, refine the voice. The best early improvements usually come from tightening the opening paragraph, trimming anything redundant, and making the closing idea explicit.',
    created_at: '2026-04-04T09:15:00.000Z',
    updated_at: '2026-04-04T09:15:00.000Z',
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
    updated_at: '2026-04-08T16:40:00.000Z',
  },
  {
    id: 'designing-a-useful-editor',
    author_id: 'demo-author-1',
    author_name: 'Avery Reed',
    excerpt: 'A good editor makes the next action obvious and keeps the surface area small.',
    title: 'Designing a Useful Editor',
    content:
      'Useful editors feel calm. They surface the important fields first, keep destructive actions out of the way, and make save behavior predictable.\n\nA draft-friendly layout usually beats a dense form. Group the title, excerpt, and body together, then place ownership and status details where they support the work instead of interrupting it.\n\nWhen a page needs deletion, make the consequence explicit and the escape route obvious. People should never wonder what happens next.',
    created_at: '2026-04-12T11:05:00.000Z',
    updated_at: '2026-04-12T11:05:00.000Z',
  },
]

const postDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function getPostById(postId: string | undefined) {
  if (!postId) {
    return undefined
  }

  return posts.find((post) => post.id === postId)
}

export function formatPostDate(value: string) {
  return postDateFormatter.format(new Date(value))
}

export function getPostParagraphs(content: string) {
  return content.split(/\n\n+/).filter(Boolean)
}