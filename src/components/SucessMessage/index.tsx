import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessMessageProps {
  title: string
  message: string
  onClose: () => void
}

export function SuccessMessage({ title, message, onClose }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8 flex flex-col justify-between gap-4"
    >
      <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <Button onClick={onClose} className="w-full">
        Fechar
      </Button>
    </motion.div>
  )
}