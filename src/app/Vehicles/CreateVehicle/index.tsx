import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
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
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react"
import { useFleet } from "@/app/Fleet/hooks/use-fleet"
import { FormFields, useCreateVehicle } from "../hooks/use-create-vehicle"
import { Select } from "@/components/custom-combobox"

const steps: Array<{
  title: string
  fields: FormFields[]
}> = [
  {
    title: "Informações Básicas",
    fields: ["plate", "model", "brand", "year"],
  },
  {
    title: "Detalhes Técnicos",
    fields: ["color", "km", "power", "fleetId"],
  },
]

export default function VehicleCreationDialog() {
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(false)
  const { createVehicleForm, handleSubmit, isSubmitting, isSuccess, resetForm } = useCreateVehicle()
  const { data: fleetsData, isLoading } = useFleet()
  const fleets = fleetsData?.data?.map((fleet) => ({
    value: fleet.id,
    label: fleet.fleetNumber,
  })) || []

  const { control, trigger } = createVehicleForm

  useEffect(() => {
    if (isSuccess) {
      setStep(3)
    }
  }, [isSuccess])

  const handleNext = async () => {
    const fieldsToValidate = steps[step - 1].fields
    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleClose = () => {
    setOpen(false)
    resetForm()
    setStep(1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar Novo Veículo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Veículo</DialogTitle>
        </DialogHeader>
        <Form {...createVehicleForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between mb-4">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-1/3 h-1 rounded-full ${
                    i + 1 <= step ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              {step <= 2 && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4">{steps[step - 1].title}</h3>
                  {step === 1 && (
                    <>
                      <FormField
                        control={control}
                        name="plate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Placa</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Modelo</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marca</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ano</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <FormField
                        control={control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cor</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="km"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quilometragem</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="power"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Potência</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="fleetId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Frota</FormLabel>
                            <FormControl>
                              <Select
                                onChange={(value) => field.onChange(value)}
                                value={field.value as string}
                                options={fleets}
                                isLoading={isLoading}
                                isFiltered
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Veículo Cadastrado com Sucesso!</h3>
                  <p className="text-gray-600">O veículo foi adicionado ao sistema</p>
                </motion.div>
              )}
            </AnimatePresence>
            <DialogFooter>
              <div className="flex justify-between w-full">
                {step > 1 && step <= 2 && (
                  <Button type="button" onClick={handleBack} variant="outline">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                )}
                {step < 2 && (
                  <Button type="button" onClick={handleNext} className="ml-auto">
                    Próximo <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {step === 2 && (
                  <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                    Cadastrar Veículo
                  </Button>
                )}
                {step === 3 && (
                  <Button type="button" onClick={handleClose} className="mx-auto">
                    Fechar
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}