import { motion } from "framer-motion";

export function ErrorIllustration() {
  return (
    <div className="relative w-[280px] h-[280px]">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-400/20 via-red-500/30 to-red-600/20" />

      {/* Círculos decorativos */}
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-red-500/40 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 30}deg) translateY(-120px)`,
            }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Elemento flutuante central */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ y: 0 }}
        animate={{ y: [-8, 8, -8] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3 min-w-[200px]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-red-400 flex items-center justify-center text-white font-medium">
            ✕
          </div>
          <div className="flex-1">
            <div className="h-2 w-24 bg-gray-200 rounded-full mb-2" />
            <div className="h-2 w-16 bg-gray-100 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Partículas brilhantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500 rounded-full"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
