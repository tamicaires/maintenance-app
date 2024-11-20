import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select } from "@/components/CustomCombobox"
import { useCreatePartRequest } from "../hooks/use-create-part-request"
import { Check, Loader2, Plus, X } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CustomDialogHeader } from "@/components/CustomDialogHeader"
import { SuccessMessage } from "@/components/SucessMessage"
import { useParts } from "@/app/PartsManager/hooks/use-parts"
import { useEmployee } from "@/app/Employee/hooks/use-employee"
import { IWorkOrder } from "@/interfaces/work-order.interface"
import { useWorkOrder } from "@/app/Order/hooks/use-work-order"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PartRequestCreationDialogProps {
  isOpenControlled?: boolean
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export function PartRequestCreationDialog({
  isOpenControlled = false,
  isOpen: isOpenProp,
  onOpenChange: onOpenChangeProp,
}: PartRequestCreationDialogProps) {
  const {
    createPartRequestForm,
    handleSubmit,
    isPending,
    step,
    setStep,
    isOpen: isOpenInternal,
    setIsOpen: setIsOpenInternal,
    reset,
    control,
  } = useCreatePartRequest()

  const [isApproving, setIsApproving] = React.useState(false)
  const [isRejecting, setIsRejecting] = React.useState(false)
  const [approvedQuantity, setApprovedQuantity] = React.useState(0)
  const [rejectionReason, setRejectionReason] = React.useState("")

  const isOpenState = isOpenControlled ? isOpenProp : isOpenInternal
  const setIsOpen = isOpenControlled ? onOpenChangeProp : setIsOpenInternal

  const { data: partsData } = useParts()
  const { data: employeesData } = useEmployee()
  const { data: workOrdersData } = useWorkOrder()

  const parts =
    partsData?.data?.map((part) => ({
      value: part.id,
      label: `${part.name} (${part.partNumber})`,
    })) || []

  const employees =
    employeesData?.data?.map((employee) => ({
      value: employee.id,
      label: employee.name,
    })) || []

  const workOrders =
    workOrdersData?.data?.map((workOrder: IWorkOrder) => ({
      value: workOrder.id,
      label: `OS-${workOrder.displayId}`,
    })) || []

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen?.(newOpen)
    if (!newOpen) {
      reset()
      setStep(1)
      setIsApproving(false)
      setIsRejecting(false)
      setApprovedQuantity(0)
      setRejectionReason("")
    }
  }

  const handleApprove = () => {
    // Implement approval logic here
    console.log("Approved with quantity:", approvedQuantity)
    setStep(2)
  }

  const handleReject = () => {
    // Implement rejection logic here
    console.log("Rejected with reason:", rejectionReason)
    setStep(2)
  }

  return (
    <Dialog open={isOpenState} onOpenChange={handleOpenChange}>
      {!isOpenControlled && (
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Solicitar Peça
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className="sm:max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {step === 1 && (
          <CustomDialogHeader
            title="Solicitação de Peça"
            subtitle="Preencha os campos abaixo para criar uma nova solicitação de peça"
          />
        )}
        {step === 1 && (
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Criar Solicitação</TabsTrigger>
              <TabsTrigger value="review">Revisar</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <Form {...createPartRequestForm}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField
                    control={control}
                    name="partId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peça</FormLabel>
                        <Select
                          onChange={(value) => field.onChange(value)}
                          value={field.value}
                          options={parts}
                          isFiltered
                          placeholder="Selecione uma peça"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <FormField
                      control={control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Quantidade</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="1"
                              placeholder="Quantidade"
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="requestedForEmployeeId"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Solicitado Para</FormLabel>
                          <Select
                            onChange={(value) => field.onChange(value)}
                            value={field.value}
                            options={employees}
                            isFiltered
                            placeholder="Funcionário"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={control}
                    name="workOrderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ordem de Serviço</FormLabel>
                        <Select
                          onChange={(value) => field.onChange(value)}
                          value={field.value}
                          options={workOrders}
                          isFiltered
                          placeholder="Selecione uma ordem de serviço"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando Solicitação...
                      </>
                    ) : (
                      "Criar Solicitação"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="review">
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Resumo da Solicitação</span>
                    <Badge variant="outline">Pendente</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Peça:</span>
                    <span>Nome da Peça (Número da Peça)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Quantidade:</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Solicitado Para:</span>
                    <span>Nome do Funcionário</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Ordem de Serviço:</span>
                    <span>OS-12345</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setIsRejecting(true)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Recusar
                  </Button>
                  <Button onClick={() => setIsApproving(true)}>
                    <Check className="mr-2 h-4 w-4" />
                    Aprovar
                  </Button>
                </CardFooter>
              </Card>
              {isApproving && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Aprovar Solicitação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormItem>
                      <FormLabel>Quantidade Aprovada</FormLabel>
                      <Input
                        type="number"
                        min="1"
                        value={approvedQuantity}
                        onChange={(e) => setApprovedQuantity(Number(e.target.value))}
                      />
                    </FormItem>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleApprove} className="w-full">Confirmar Aprovação</Button>
                  </CardFooter>
                </Card>
              )}
              {isRejecting && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Recusar Solicitação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormItem>
                      <FormLabel>Motivo da Recusa</FormLabel>
                      <Textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Explique o motivo da recusa..."
                      />
                    </FormItem>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleReject} className="w-full">Confirmar Recusa</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
        {step === 2 && (
          <SuccessMessage
            title="Solicitação de Peça Processada com Sucesso!"
            message="A solicitação de peça foi processada no sistema"
            onClose={() => handleOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}