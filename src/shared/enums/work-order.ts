export enum TypeOfMaintenance {
  PREDITIVA = "Preditiva",
  PREVENTIVA = "Preventiva",
  CORRETIVA = "Corretiva",
}

export enum MaintenanceStatus {
  FILA = "Fila",
  MANUTENCAO = "Manutencao",
  AGUARDANDO_PECA = "AguardandoPeca",
  FINALIZADA = "Finalizada",
  CANCELADA = "Cancelada",
}

export type TMaintenanceStatus = keyof typeof MaintenanceStatus;

export enum SeverityLevel {
  BAIXA = "Baixa",
  NORMAL = "Normal",
  ALTA = "Alta",
  URGENTE = "Urgente",
}

export enum Box {
  UM = "Um",
  DOIS = "Dois",
  TRES = "Tres",
  QUATRO = "Quatro",
  CINCO = "Cinco",
  SEIS = "Seis",
  SETE = "Sete",
  OITO = "Oito",
  NOVE = "Nove",
  DEZ = "Dez",
}
