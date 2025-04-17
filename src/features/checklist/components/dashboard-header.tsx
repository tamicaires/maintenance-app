import { Bell, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DashboardHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold">Checklist System</h2>
          <Input 
            type="search" 
            placeholder="Search templates and checklists..."
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-primary" />
        </div>
      </div>
    </header>
  )
}

