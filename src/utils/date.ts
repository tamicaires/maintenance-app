import { format as fnsFormat } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dateUtil = {
  formatDate: (date: Date | null | undefined): string => {
    if (!date) return "";
    return date.toISOString().slice(0, 16);
  },
  parseDate: (dateString: string): Date => {
    return new Date(dateString);
  },
  timeSince: (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return years === 1 ? "1 ano atrás" : `${years} anos atrás`;
    if (months > 0) return months === 1 ? "1 mês atrás" : `${months} meses atrás`;
    if (days > 0) return days === 1 ? "1 dia atrás" : `${days} dias atrás`;
    if (hours > 0) return hours === 1 ? "1 hora atrás" : `${hours} horas atrás`;
    if (minutes > 0) return minutes === 1 ? "1 minuto atrás" : `${minutes} minutos atrás`;
    return seconds === 1 ? "1 segundo atrás" : `${seconds} segundos atrás`;
  },
  formatDateBR: (date: Date) => {
    return fnsFormat(date, "dd/MM/yyyy", { locale: ptBR })
  },
  getToday: (): string => {
    const today = new Date();
    return today.toISOString();
  },
  getTodayInterval: (): { startDate: Date, endDate: Date } => {
    const today = new Date();

    const startDate = new Date(today.setHours(0, 0, 0, 0));
    const endDate = new Date(today.setHours(23, 59, 59, 999));

    return {
      startDate,
      endDate,
    };

  }
}

export const dateLabels = {
  today: "Hoje",
  yesterday: "Ontem",
  thisWeek: "Esta semana",
  lastWeek: "Semana passada",
  thisMonth: "Este mês",
  lastMonth: "Mês passado",
  thisYear: "Este ano",
  lastYear: "Ano passado",
  includeTime: "Incluir horário",
  range: "Intervalo",
  days: "dias",
  reset: "Resetar",
  apply: "Aplicar",
  pickDateRange: "Filtrar por data"
}

