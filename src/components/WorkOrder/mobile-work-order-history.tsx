import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface HistoryEvent {
  id: string
  date: string
  description: string
  user: string
  details: string
}

interface MobileWorkOrderHistoryProps {
  history: HistoryEvent[]
}

export function MobileWorkOrderHistory({ history }: MobileWorkOrderHistoryProps) {
  return (
    <div className="space-y-3">
      {history.map((event) => (
        <Card key={event.id}>
          <CardHeader className="p-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {format(new Date(event.date), "dd/MM/yyyy HH:mm")}
              </p>
              <CardTitle className="text-sm">{event.description}</CardTitle>
              <CardDescription className="text-xs">{event.user}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-xs text-muted-foreground">{event.details}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}