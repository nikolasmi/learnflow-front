import type { Category } from "./Category"
import type { Lesson } from "./Lesson"
import type { Thumbnail } from "./Thumbnail"
import type { User } from "./User"

export interface Course {
    courseId: number
    title: string
    shortDescription: string
    description: string
    price: string
    categoryId: number
    userId: number
    createdAt: string
    category: Category
    user: User
    thumbnail: Thumbnail
    lessons?: Lesson[]
}
  