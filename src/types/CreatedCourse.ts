import type { Thumbnail } from "./Thumbnail"

export interface CreatedCourse {
  courseId: number
  title: string
  createdAt: string
  lessonCount: number
  thumbnailUrl: Thumbnail
}