export function StatusTimelime() {
  return (
    <div className="flex justify-between items-center bg-card bg-opacity-10 p-4 rounded-lg w-full">
      <div className="flex justify-between w-full">
        {[
          { label: "Fila", date: "12/02/2024 12:00", active: true },
          {
            label: "Em andamento",
            date: "12/02/2024 12:00",
            active: true,
          },
          {
            label: "Aguardando Peca",
            date: "13/02/2024 09:00",
            active: true,
          },
          {
            label: "Finalizada",
            date: "12/02/2024 15:00",
            active: false,
          },
        ].map((stage, _) => (
          <div key={stage.label} className="flex  items-center">
            {" "}
            <div className="flex flex-col items-center justify-between">
              <div
                className={`w-3 h-3 rounded-full ${
                  stage.active ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <p className="text-sm tracking-tight mt-1 font-medium ">
                {stage.label}
              </p>
              <p className="text-xs text-muted-foreground">{stage.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
