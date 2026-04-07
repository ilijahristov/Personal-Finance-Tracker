import { SectionCards } from "@/components/cards/section-cards"
import CategoriesPage from "@/components/categories_table/CategoriesTable"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionCards />
      <CategoriesPage />
    </div>
  )
}
