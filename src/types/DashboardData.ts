import type { CreatedCourse } from "./CreatedCourse"
import type { PurchasePreview } from "./PurchasePreview"
import type { userWishlist } from "./UserWishlist"

export interface DashboardData {
  totalPurchases: number
  totalSpent: string
  createdCoursesCount: number
  comments: number
  totalEarned: number
  recentPurchases: PurchasePreview[]
  ownCourses: CreatedCourse[]
  wishlist: userWishlist[]
}