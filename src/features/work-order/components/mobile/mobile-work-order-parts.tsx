import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface Part {
  id: string
  name: string
  code: string
  quantity: number
  status: string
  cost: number
  supplier: string
}

interface MobileWorkOrderPartsProps {
  parts: Part[]
}

export function MobileWorkOrderParts({ parts }: MobileWorkOrderPartsProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-3">
      {parts.map((part) => (
        <Collapsible key={part.id} open={openItems.includes(part.id)} onOpenChange={() => toggleItem(part.id)}>
          <CollapsibleTrigger className="w-full">
            <Card>
              <CardHeader className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">{part.name}</CardTitle>
                    <CardDescription className="text-xs">Código: {part.code}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs px-2 py-0.5",
                        part.status === "Entregue" && "bg-green-100 text-green-800",
                        part.status === "Pendente" && "bg-yellow-100 text-yellow-800",
                        part.status === "Em Trânsito" && "bg-blue-100 text-blue-800"
                      )}
                    >
                      {part.status}
                    </Badge>
                    {openItems.includes(part.id) ? (
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
                    <span className="text-muted-foreground">Quantidade</span>
                    <span>{part.quantity}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Custo</span>
                    <span>R$ {part.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Fornecedor</span>
                    <span>{part.supplier}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}