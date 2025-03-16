import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import type { FieldValues } from "react-hook-form"

interface SuccessViewProps<T extends FieldValues> {
  formData: T
  successComponent?: (data: T) => ReactNode
  title?: string
  description?: string
}

export function SuccessView<T extends FieldValues>({
  formData,
  successComponent,
  title = "Operação Concluída com Sucesso!",
  description = "Seus dados foram processados com sucesso.",
}: SuccessViewProps<T>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="py-4"
    >
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mb-6 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-200"
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
        </motion.div>
        <motion.h3
          className="text-2xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-muted-foreground max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {description}
        </motion.p>
      </div>

      {successComponent ? (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {successComponent(formData)}
        </motion.div>
      ) : null}
    </motion.div>
  )
}

