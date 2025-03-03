export interface FleetSummaryItem {
  id: string
  count: number
  label: string
  icon: "queue" | "maintenance" | "parts" | "completed"
  type: "queue" | "maintenance" | "parts" | "completed"
}

export interface FleetSummaryProps {
  date: Date
  items: FleetSummaryItem[]
}

