import { BaseService } from "@/core/api/base-service"
import type {
  IQueueChartData,
  ITypeMaintenanceChartData,
} from "@/shared/types/dashboard"

/**
 * Service for dashboard data
 */
class DashboardService extends BaseService<void> {
  constructor() {
    super("work-orders/dashboard")
  }

  /**
   * Get queue chart data
   */
  async getQueueChart(): Promise<IQueueChartData> {
    return this.get<IQueueChartData>("/queue-charts")
  }

  /**
   * Get type maintenance chart data
   */
  async getTypeMaintenanceChart(): Promise<ITypeMaintenanceChartData> {
    return this.get<ITypeMaintenanceChartData>("/type-maintenance-chart")
  }
}

export const dashboardService = new DashboardService()
