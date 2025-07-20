export interface Comment {
  commentId: number
  userId: number
  courseId: number
  comment: string
  rating: number
  createdAt: string
  user: {
    userId: number
    name: string
    email: string
  }
  course?: {
    courseId: number
    title: string
    // ... ostala polja ako treba
  }
}
