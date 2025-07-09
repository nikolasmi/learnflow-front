import type { CreatedCourse } from "./CreatedCourse"
import type { PurchasePreview } from "./PurchasePreview"

export interface DashboardData {
  totalPurchases: number
  totalSpent: string
  createdCoursesCount: number
  comments: number
  totalEarned: number
  recentPurchases: PurchasePreview[]
  ownCourses: CreatedCourse[]
}