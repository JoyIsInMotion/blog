export type NavItem = {
  label: string
  href: string
}

export type Post = {
  id: string
  author_id: string
  title: string
  content: string
  cover_image_url: string | null
  created_at: string
  updated_at: string
}

export type AuthSessionState = {
  loading: boolean
  userId: string | null
}