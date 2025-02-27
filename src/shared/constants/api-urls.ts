
export const SubjectUrl = {
  CHECKLIST: "/checklist",
  CHECKLIST_ITEM: "/checklist-item",
  EVENT: "/event",
  DASHBOARD: "/work-orders/dashboard"
}

export const ApiEndpoints = {
  DASHBOARD: {
    GET_QUEUE_CHART: `${SubjectUrl.DASHBOARD}/queue-charts`,
    GET_TYPE_MAINTENANCE_CHART: `${SubjectUrl.DASHBOARD}/type-maintenance-chart`,
  },
  CHECKLIST: {
    path: "/checklist",
    CREATE: "/checklist",
    GET_WITH_RELATIONAL_DATA: "/checklist",
    GET_BY_WORK_ORDER: (workOrderId: string) => `${SubjectUrl.CHECKLIST}/workorder/${workOrderId}`
  },
  CHECKLIST_ITEM: {
    path: "/checklist-item",
    CREATE: SubjectUrl.CHECKLIST_ITEM,
    CREATE_BATCH: `${SubjectUrl.CHECKLIST_ITEM}/batch`,
    GET_ALL: SubjectUrl.CHECKLIST_ITEM,
    GET_WITH_RELATIONAL_DATA: SubjectUrl.CHECKLIST_ITEM,
    GET_BY_CHECKLIST: (checklistId: string) => `${SubjectUrl.CHECKLIST_ITEM}/checklist/${checklistId}`,
    CHANGE_CONFORMITY: (checklistId: string) => `${SubjectUrl.CHECKLIST_ITEM}/conformity/${checklistId}`,
  },
  WORK_ORDER: {
    path: "/work-order",
    CREATE: "/work-order",
    UPDATE: "/work-order/update",
    GET_ALL: "/work-order",
    GET_BY_ID: (id: string) => `/work-order/${id}`,
  },
  EVENT: {
    LIST: SubjectUrl.EVENT,
    GET_BY_WORK_ORDER: (workOrderId: string) => `${SubjectUrl.EVENT}/work-order/${workOrderId}`
  }
};
