'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Minus,
  Package,
  Loader2,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data interfaces
interface IMockPart {
  id: string
  name: string
  partNumber: string
  stockQuantity: number
}

interface IMockUser {
  id: string
  name: string
  email: string
  avatar?: string
}

interface IMockWorkOrder {
  id: string
  displayId: string
  description: string
}

interface IPartRequest {
  id: string
  requestedForEmployeeId: string | null
  handledById: string | null
  quantity: number
  approvedQuantity: number | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  isRejected: boolean
  rejectionReason: string | null
  requestedAt: Date
  handledAt: Date | null
  deliveredAt: Date | null
  workOrderId: string | null
  updatedAt: Date
  part?: IMockPart
  requestedBy?: IMockUser
  workOrder?: IMockWorkOrder | null
}

// Mock data
const mockParts: IMockPart[] = [
  {
    id: "P1",
    name: "Filtro de Óleo Premium",
    partNumber: "FO-2023-001",
    stockQuantity: 15
  },
  {
    id: "P2",
    name: "Correia Dentada",
    partNumber: "CD-2023-002",
    stockQuantity: 8
  },
  {
    id: "P3",
    name: "Pastilha de Freio",
    partNumber: "PF-2023-003",
    stockQuantity: 20
  },
  {
    id: "P4",
    name: "Vela de Ignição",
    partNumber: "VI-2023-004",
    stockQuantity: 5
  }
]

const mockUsers: IMockUser[] = [
  {
    id: "U1",
    name: "João Silva",
    email: "joao.silva@empresa.com",
  },
  {
    id: "U2",
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
  },
  {
    id: "U3",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@empresa.com",
  }
]

const mockWorkOrders: IMockWorkOrder[] = [
  {
    id: "WO1",
    displayId: "2023001",
    description: "Manutenção Preventiva"
  },
  {
    id: "WO2",
    displayId: "2023002",
    description: "Troca de Componentes"
  }
]

// Generate mock requests
const mockRequests: IPartRequest[] = [
  {
    id: "R1",
    requestedForEmployeeId: "U1",
    handledById: null,
    quantity: 2,
    approvedQuantity: null,
    status: "PENDING",
    isRejected: false,
    rejectionReason: null,
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    handledAt: null,
    deliveredAt: null,
    workOrderId: "WO1",
    updatedAt: new Date(),
    part: mockParts[0],
    requestedBy: mockUsers[0],
    workOrder: mockWorkOrders[0]
  },
  {
    id: "R2",
    requestedForEmployeeId: "U2",
    handledById: null,
    quantity: 10,
    approvedQuantity: null,
    status: "PENDING",
    isRejected: false,
    rejectionReason: null,
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    handledAt: null,
    deliveredAt: null,
    workOrderId: "WO2",
    updatedAt: new Date(),
    part: mockParts[1],
    requestedBy: mockUsers[1],
    workOrder: mockWorkOrders[1]
  },
  {
    id: "R3",
    requestedForEmployeeId: "U3",
    handledById: null,
    quantity: 4,
    approvedQuantity: null,
    status: "PENDING",
    isRejected: false,
    rejectionReason: null,
    requestedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    handledAt: null,
    deliveredAt: null,
    workOrderId: null,
    updatedAt: new Date(),
    part: mockParts[2],
    requestedBy: mockUsers[2]
  },
  {
    id: "R4",
    requestedForEmployeeId: "U1",
    handledById: null,
    quantity: 6,
    approvedQuantity: null,
    status: "PENDING",
    isRejected: false,
    rejectionReason: null,
    requestedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    handledAt: null,
    deliveredAt: null,
    workOrderId: "WO1",
    updatedAt: new Date(),
    part: mockParts[3],
    requestedBy: mockUsers[0],
    workOrder: mockWorkOrders[0]
  }
]

interface BatchPartRequestApprovalDialogProps {
  requests?: IPartRequest[]
  isOpen?: boolean
  onClose: () => void
  onUpdateRequests: (updatedRequests: IPartRequest[]) => Promise<void>
}

// Helper function to format relative time
const formatRelativeTime = (date: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Agora'
  if (diffInMinutes < 60) return `${diffInMinutes}min atrás`
  if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours}h atrás`
  }
  const days = Math.floor(diffInMinutes / 1440)
  return `${days}d atrás`
}

export function BatchPartRequestApprovalDialog({
  requests = mockRequests,
  isOpen,
  onClose,
  onUpdateRequests
}: BatchPartRequestApprovalDialogProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [actions, setActions] = useState<Record<string, { type: 'APPROVE' | 'REJECT', quantity?: number, reason?: string }>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleAction = (requestId: string, action: { type: 'APPROVE' | 'REJECT', quantity?: number, reason?: string }) => {
    setActions(prev => ({
      ...prev,
      [requestId]: action
    }))
  }

  const updateQuantity = (requestId: string, quantity: number) => {
    setActions(prev => ({
      ...prev,
      [requestId]: {
        ...prev[requestId],
        quantity: Math.max(1, quantity)
      }
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const updatedRequests = requests.map(request => {
        const action = actions[request.id]
        if (!action) return request

        return {
          ...request,
          status: action.type === 'APPROVE' ? 'APPROVED' : 'REJECTED',
          approvedQuantity: action.type === 'APPROVE' ? action.quantity : null,
          rejectionReason: action.type === 'REJECT' ? action.reason : null,
          isRejected: action.type === 'REJECT',
          handledAt: new Date(),
        }
      })

      await onUpdateRequests(updatedRequests)
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const getActionBadge = (action?: { type: 'APPROVE' | 'REJECT' }) => {
    if (!action) return null
    
    return action.type === 'APPROVE' ? (
      <Badge className="bg-green-100 text-green-500">
        <CheckCircle className="w-3 h-3 mr-1" />
        Aprovando
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-500">
        <XCircle className="w-3 h-3 mr-1" />
        Rejeitando
      </Badge>
    )
  }

  const pendingRequests = requests.filter(r => r.status === 'PENDING')
  const hasActions = Object.keys(actions).length > 0

  return (
    <Dialog open={false} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Aprovação em Lote
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-normal">
                {pendingRequests.length} solicitações pendentes
              </Badge>
              {hasActions && (
                <Badge variant="secondary" className="font-normal">
                  {Object.keys(actions).length} ações selecionadas
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[500px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Solicitação</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="w-[100px]">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.map((request) => (
                <Collapsible
                  key={request.id}
                  open={expandedItems.includes(request.id)}
                  onOpenChange={() => toggleExpand(request.id)}
                >
                  <TableRow className="group">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100">
                            {expandedItems.includes(request.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <div>
                          <p className="font-medium">{request.part?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.part?.partNumber}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={request.requestedBy?.avatar} />
                          <AvatarFallback>{request.requestedBy?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{request.requestedBy?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatRelativeTime(request.requestedAt)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{request.quantity}</TableCell>
                    <TableCell className="text-right">
                      <span className={request.quantity > (request.part?.stockQuantity || 0) ? 'text-red-500' : ''}>
                        {request.part?.stockQuantity}
                      </span>
                    </TableCell>
                    <TableCell>{getActionBadge(actions[request.id])}</TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="p-4">
                        <div className="space-y-4">
                          {request.workOrder && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Badge variant="outline">OS-{request.workOrder.displayId}</Badge>
                              <span className="text-muted-foreground">{request.workOrder.description}</span>
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleAction(request.id, { type: 'REJECT' })}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Rejeitar
                            </Button>
                            <Button
                              className="flex-1"
                              onClick={() => handleAction(request.id, { 
                                type: 'APPROVE',
                                quantity: request.quantity
                              })}
                            >
                              <CheckCircle className="mr-2  h-4 w-4" />
                              Aprovar
                            </Button>
                          </div>

                          {actions[request.id]?.type === 'APPROVE' && (
                            <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-5">
                              <Label>Quantidade a ser aprovada</Label>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    const current = actions[request.id]?.quantity || request.quantity
                                    updateQuantity(request.id, current - 1)
                                  }}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                  type="number"
                                  value={actions[request.id]?.quantity || request.quantity}
                                  onChange={(e) => updateQuantity(request.id, Number(e.target.value))}
                                  className="w-20 text-center"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    const current = actions[request.id]?.quantity || request.quantity
                                    updateQuantity(request.id, current + 1)
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              {(actions[request.id]?.quantity || 0) > (request.part?.stockQuantity || 0) && (
                                <p className="text-sm text-red-500 flex items-center">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Quantidade excede o estoque disponível
                                </p>
                              )}
                            </div>
                          )}

                          {actions[request.id]?.type === 'REJECT' && (
                            <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-5">
                              <Label>Motivo da Rejeição</Label>
                              <Textarea
                                value={actions[request.id]?.reason || ''}
                                onChange={(e) => handleAction(request.id, {
                                  type: 'REJECT',
                                  reason: e.target.value
                                })}
                                placeholder="Descreva o motivo da rejeição..."
                                className="min-h-[80px]"
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {Object.keys(actions).length} de {pendingRequests.length} solicitações processadas
          </p>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!hasActions || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar Ações'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}