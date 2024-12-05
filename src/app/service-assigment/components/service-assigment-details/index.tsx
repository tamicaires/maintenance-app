import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

import { CalendarIcon, CheckCircle, Clock, Edit2Icon, Save, XCircle, Minus } from 'lucide-react'
import { Task, TaskFormData } from "@/shared/types/task"

interface ServiceAssigmentDetailsDialogProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (taskId: string, data: TaskFormData) => void
  canEdit: boolean
}

export function ServiceAssigmentDetailsDialog({ task, open, onOpenChange, onSave, canEdit }: ServiceAssigmentDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<TaskFormData | null>(null)
  const [isFormChanged, setIsFormChanged] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        nfNumber: task.nfNumber,
        status: task.status,
        startAt: task.startAt.toISOString(),
        endAt: task.endAt?.toISOString(),
        description: task.description,
        category: task.category,
        rebounds: task.rebounds
      })
      setIsFormChanged(false)
    }
  }, [task])

  if (!task) return null

  const handleInputChange = (field: string, value: any) => {
    if (formData) {
      const newFormData = { ...formData, [field]: value }
      setFormData(newFormData)
      setIsFormChanged(true)
    }
  }

  const handleSave = () => {
    if (formData) {
      onSave(task.id, formData)
      setIsEditing(false)
    }
  }

  const renderEditableField = (field: string, currentValue: any, editComponent: React.ReactNode) => {
    return isEditing ? (
      editComponent
    ) : (
      <div>{currentValue}</div>
    )
  }

  const renderDatePicker = (field: 'startAt' | 'endAt', label: string) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={!formData?.[field] ? "text-muted-foreground" : ""}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formData?.[field] ? format(new Date(formData[field]!), "PPP") : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={formData?.[field] ? new Date(formData[field]!) : undefined}
          onSelect={(date) => handleInputChange(field, date?.toISOString())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {renderEditableField(
              'title',
              task.title,
              <Input 
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="text-2xl font-bold"
              />
            )}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Número NF</Label>
                {renderEditableField(
                  'nfNumber',
                  task.nfNumber,
                  <Input 
                    value={formData?.nfNumber}
                    onChange={(e) => handleInputChange('nfNumber', e.target.value)}
                  />
                )}
              </div>
              <div>
                <Label>Categoria</Label>
                {renderEditableField(
                  'category',
                  task.category,
                  <Input 
                    value={formData?.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                )}
              </div>
            </div>
            <div>
              <Label>Status</Label>
              {renderEditableField(
                'status',
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {task.status === "completed" ? <CheckCircle className="w-4 h-4 mr-1" /> : <Clock className="w-4 h-4 mr-1" />}
                  {task.status === "completed" ? "Concluído" : "Pendente"}
                </div>,
                <Select 
                  value={formData?.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Datas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Início</Label>
                  {renderEditableField(
                    'startAt',
                    format(task.startAt, "dd/MM/yyyy HH:mm"),
                    renderDatePicker('startAt', 'Selecionar data de início')
                  )}
                </div>
                <div>
                  <Label>Conclusão</Label>
                  {renderEditableField(
                    'endAt',
                    task.endAt ? format(task.endAt, "dd/MM/yyyy HH:mm") : 'Não concluído',
                    renderDatePicker('endAt', 'Selecionar data de conclusão')
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Reboques</h4>
              {renderEditableField(
                'rebounds',
                <div className="flex gap-2">
                  {task.rebounds.map((reb) => (
                    <span
                      key={reb}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                    >
                      {reb}° Reb
                    </span>
                  ))}
                </div>,
                <div className="flex items-center gap-2">
                  {formData?.rebounds.map((reb, index) => (
                    <div key={index} className="flex items-center">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                        {reb}° Reb
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          const newRebounds = formData.rebounds.filter((_, i) => i !== index)
                          handleInputChange('rebounds', newRebounds)
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Select
                    onValueChange={(value) => {
                      const newRebounds = [...formData!.rebounds, parseInt(value)]
                      handleInputChange('rebounds', newRebounds)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Adicionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}° Reb
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Responsáveis</h4>
              <div className="flex -space-x-2">
                {task.assignees.map((assignee) => (
                  <img
                    key={assignee.id}
                    src={assignee.avatar}
                    alt={assignee.name}
                    title={assignee.name}
                    className="w-8 h-8 rounded-full border-2 border-background"
                  />
                ))}
              </div>
            </div>
            <div>
              <Label>Descrição</Label>
              {renderEditableField(
                'description',
                <p className="text-sm text-muted-foreground">{task.description}</p>,
                <Textarea 
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="history">
            <p>Histórico do serviço (a ser implementado)</p>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end space-x-2 mt-4">
          {canEdit && (
            isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={!isFormChanged}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar alterações
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2Icon className="w-4 h-4 mr-2" />
                Editar
              </Button>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
