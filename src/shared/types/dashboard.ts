import { TypeOfMaintenance } from "../enums/work-order"

export interface IHourlyData {
  hour: string
  count: number
}

export interface IQueueChartData {
  hourlyData: IHourlyData[]
  totalQueueCount: number
  previousTotalQueueCount: number
  percentageChange: number
}

export type MaintenanceTypeCounts = {
  [key in keyof typeof TypeOfMaintenance]: number;
}

export interface ITypeMaintenanceChartData {
  todayCounts: MaintenanceTypeCounts
  yesterdayPreventiveCount: number
}