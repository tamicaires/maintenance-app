import { Users, ShoppingBag, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  iconClassName?: string
}

export function StatsCard({ title, value, icon, iconClassName }: StatsCardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${iconClassName}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatsCard
        title="Total User"
        value="40,689"
        icon={<Users className="h-6 w-6 text-indigo-600" />}
        iconClassName="bg-indigo-100"
      />
      <StatsCard
        title="Total Order"
        value="10293"
        icon={<ShoppingBag className="h-6 w-6 text-yellow-600" />}
        iconClassName="bg-yellow-100"
      />
      <StatsCard
        title="Total Sales"
        value="$89,000"
        icon={<DollarSign className="h-6 w-6 text-emerald-600" />}
        iconClassName="bg-emerald-100"
      />
    </div>
  )
}