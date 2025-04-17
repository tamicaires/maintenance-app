import { motion } from "framer-motion";

type WorkOrderProps = {
  title: string;
  subtitle: string;
  actionButton: React.ReactNode;
};

export function WorkOrderHeader({
  title,
  subtitle,
  actionButton,
}: WorkOrderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
    >
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {actionButton}
    </motion.div>
  );
}
