
export function OrderHistory() {
  return (
    <div className="mx-auto p-4 bg-card rounded-lg border">
      <div className="">
        <h3 className="text-2xl font-bold mb-4 sm:mb-0">Histórico da Ordem</h3>
        <div className="space-y-4 p-4">
          {[
            {
              date: "13/02/2024 09:00",
              action: "Peça recebida: Filtro de Óleo",
              user: "Ana Souza",
            },
            {
              date: "12/02/2024 14: 30",
              action: "Iniciada manutenção: Troca de Óleo",
              user: "João Silva",
            },
            {
              date: "12/02/2024 12:00",
              action: "Veículo entrou na oficina",
              user: "Maria Oliveira",
            },
            {
              date: "12/02/2024 10:15",
              action: "Ordem de serviço criada",
              user: "Bruno Silva",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">{item.date}</p>
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">por {item.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
