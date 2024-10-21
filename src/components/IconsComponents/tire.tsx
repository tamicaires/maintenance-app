import tireImage from "@/assets/tires.svg"; // Importando o SVG como uma imagem comum

const Tire = ({ size = 50, color = "black" }) => {
  const computedSize = `${size}px`;

  return (
    <img
      src={tireImage}
      alt="Tire"
      width={computedSize}
      height={computedSize}
      style={{
        filter: color === "black" ? "none" : `drop-shadow(0 0 0 ${color})`, // Ajusta a cor usando CSS
        display: "inline-block",
      }}
    />
  );
};

export default Tire;
