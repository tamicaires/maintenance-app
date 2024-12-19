import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { LoaderVariant } from "@/store/features/loader"

const loaderVariants = cva(
  "flex items-center justify-center bg-background/30 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "",
        spinner: "",
        dots: "",
        pulse: "",
      },
      isGlobal: {
        true: "fixed inset-0 z-[9999]",
        false: "absolute inset-0 z-50",
      },
    },
    defaultVariants: {
      variant: "default",
      isGlobal: true,
    },
  }
)

export interface LoaderProps extends VariantProps<typeof loaderVariants> {
  message?: string
  variant?: LoaderVariant
  isGlobal?: boolean
}

const spinnerVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

function SpinnerLoader() {
  return (
    <motion.div
      className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )
}

function DotsLoader() {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-3 w-3 rounded-full bg-primary"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function PulseLoader() {
  return (
    <motion.div
      className="h-12 w-12 rounded-full bg-primary/20"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1, opacity: [1, 0.5, 1] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="h-full w-full rounded-full bg-primary/40"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1, opacity: [1, 0, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
    </motion.div>
  )
}

export function Loader({ variant = "default", message, isGlobal = true }: LoaderProps) {
  const loaderComponents = {
    default: <SpinnerLoader />,
    spinner: <SpinnerLoader />,
    dots: <DotsLoader />,
    pulse: <PulseLoader />,
  }

  return (
    <AnimatePresence>
      <motion.div
        className={cn(loaderVariants({ variant, isGlobal }))}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={spinnerVariants}
      >
        <div className="flex flex-col items-center gap-4">
          {loaderComponents[variant]}
          {message && (
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {message}
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

