export type Post = {
  id: string
  body?: string
  media?: string
  createdAt: Date
  authorId: string
}

export type User = {
  id: string,
  name: string,
  email: string,
}