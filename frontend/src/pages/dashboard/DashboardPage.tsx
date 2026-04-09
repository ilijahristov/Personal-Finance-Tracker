import { SectionCards } from "@/components/cards/section-cards"
import CategoriesPage from "@/components/categories_table/CategoriesTable"
import { MultiBarChart } from "@/components/chart/MultiBarChart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionCards />
      <MultiBarChart />
      <CategoriesPage />
    </div>
  )
}
