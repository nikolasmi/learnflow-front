import type { Thumbnail } from "./Thumbnail"

export interface PurchasePreview {
  courseId: number
  title: string
  purchasedAt: string
  thumbnail: Thumbnail
}