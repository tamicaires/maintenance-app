import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { IChecklist, IChecklistTemplate } from "@/shared/types/checklist"
import * as LucideIcons from "lucide-react"

interface ActiveChecklistDetailsProps {
  checklist: IChecklist
  template: IChecklistTemplate
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActiveChecklistDetails({ checklist, template, open, onOpenChange }: ActiveChecklistDetailsProps) {
  const IconComponent = LucideIcons[template.icon as keyof typeof LucideIcons] as React.ElementType
  const completedItems = checklist.items.filter(item => item.isConform !== null).length
  const progress = (completedItems / checklist.items.length) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {IconComponent && <IconComponent className={`w-6 h-6`} />}
            {checklist.templateId || template.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Work Order</h4>
            <p className="text-sm text-muted-foreground">{checklist.workOrderId}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Progress</h4>
            <Progress value={progress} className="w-full mt-2" />
            <p className="text-sm text-muted-foreground mt-1">{completedItems} of {checklist.items.length} items completed</p>
          </div>
        </div>
        <ScrollArea className="mt-6 max-h-[300px]">
          <h4 className="text-sm font-medium mb-2">Checklist Items</h4>
          <ul className="space-y-2">
            {checklist.items.map((item, index) => (
              <li key={item.id} className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{index + 1}.</span>
                  <span className="text-sm">{item.checklistId}</span>
                </div>
                {/* <Badge variant={item.isConform === null ? "outline" : item.isConform ? "success" : "destructive"}>
                  {item.isConform === null ? "Pending" : item.isConform ? "Conform" : "Non-Conform"}
                </Badge> */}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

