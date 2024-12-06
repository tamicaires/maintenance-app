import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

type Service = {
  id: string
  name: string
  status: string
  technician: string
  duration: string
  cost: number
  notes?: string
}

type MobileWorkOrderServicesProps = {
  services: Service[]
}

export function MobileWorkOrderServices({ services }: MobileWorkOrderServicesProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <Collapsible key={service.id} open={openItems.includes(service.id)} onOpenChange={() => toggleItem(service.id)}>
          <CollapsibleTrigger className="w-full">
            <Card>
              <CardHeader className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">{service.name}</CardTitle>
                    <CardDescription className="text-xs">{service.technician}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs px-2 py-0.5",
                        service.status === "Concluído" && "bg-green-100 text-green-800",
                        service.status === "Em Andamento" && "bg-blue-100 text-blue-800",
                        service.status === "Pendente" && "bg-yellow-100 text-yellow-800"
                      )}
                    >
                      {service.status}
                    </Badge>
                    {openItems.includes(service.id) ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Duração</span>
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Custo</span>
                    <span>R$ {service.cost.toFixed(2)}</span>
                  </div>
                  {service.notes && (
                    <>
                      <Separator className="my-2" />
                      <p className="text-xs text-muted-foreground">{service.notes}</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}