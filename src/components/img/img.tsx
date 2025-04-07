import React, { useState, useEffect } from "react";

interface ImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  fill?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  onClick?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  width,
  height,
  priority = false,
  quality,
  placeholder = "empty",
  blurDataURL,
  sizes,
  loading: loadingProp,
  fill = false,
  style = {},
  className = "",
  onLoad,
  onError,
  fallbackSrc = "/default-fallback.png",
  onClick,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Reset loading state when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setError(false);
  }, [src]);

  // Determine loading attribute
  const loading = priority ? "eager" : loadingProp || "lazy";

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  // Handle image error
  const handleError = () => {
    setIsLoading(false);
    setError(true);

    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }

    if (onError) onError();
  };

  // Build srcSet with quality if provided
  const getSrcWithQuality = (url: string, q?: number) => {
    if (!q || !url.includes("?")) return url;
    return `${url}${url.includes("?") ? "&" : "?"}q=${q}`;
  };

  // Combine styles
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(fill
      ? {
          position: "absolute",
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
        }
      : {}),
    ...(width !== undefined && !fill ? { width } : {}),
    ...(height !== undefined && !fill ? { height } : {}),
    ...(isLoading && placeholder === "blur" && blurDataURL
      ? {
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("${blurDataURL}")`,
        }
      : {}),
  };

  // Container style for fill mode
  const containerStyle: React.CSSProperties = fill
    ? {
        position: "relative",
        width: "100%",
        height: "100%",
      }
    : {};

  // Render placeholder during loading if needed
  if (isLoading && placeholder === "blur" && blurDataURL) {
    return (
      <div style={containerStyle} className={className}>
        <img
          src={blurDataURL || "/placeholder.svg"}
          alt={alt}
          style={{
            ...combinedStyle,
            filter: "blur(20px)",
            transition: "opacity 500ms ease-in-out",
          }}
        />
        <img
          src={getSrcWithQuality(currentSrc, quality) || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={loading}
          style={{
            ...combinedStyle,
            opacity: 0,
            transition: "opacity 500ms ease-in-out",
          }}
          className={className}
          onLoad={() => {
            handleLoad();
            const imgElement = document.querySelector(
              `img[src="${getSrcWithQuality(currentSrc, quality)}"]`
            );
            if (imgElement) {
              (imgElement as HTMLElement).style.opacity = "1";
            }
          }}
          onError={handleError}
          onClick={onClick}
        />
      </div>
    );
  }

  // Wrap in container if fill is true
  if (fill) {
    return (
      <div style={containerStyle} className={className}>
        <img
          src={getSrcWithQuality(currentSrc, quality) || "/placeholder.svg"}
          alt={alt}
          sizes={sizes}
          loading={loading}
          style={combinedStyle}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
        />
      </div>
    );
  }

  // Regular image
  return (
    <img
      src={getSrcWithQuality(currentSrc, quality) || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={loading}
      style={combinedStyle}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      onClick={onClick}
    />
  );
};

export default Image;
