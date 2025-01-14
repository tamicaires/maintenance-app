import React from "react";

interface ImgProps {
  source: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
  fallbackSrc?: string;
}

const Img: React.FC<ImgProps> = ({
  source,
  alt = "",
  className = "",
  style = {},
  onClick,
  width,
  height,
  fallbackSrc = "/default-fallback.png",
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(source);

  const handleError = () => {
    if (fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={{ ...style, width, height }}
      onClick={onClick}
      onError={handleError}
    />
  );
};

export default Img;
