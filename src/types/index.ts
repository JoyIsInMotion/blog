export type NavItem = {
  label: string
  href: string
}

export type Post = {
  id: string
  author_id: string
  author_name: string
  excerpt: string
  title: string
  content: string
  created_at: string
  updated_at: string
  cover_image_url?: string | null
}

export type AuthSessionState = {
  loading: boolean
  userId: string | null
}