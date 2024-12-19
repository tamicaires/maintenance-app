import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Loader } from "./loader";

export function RootLoader() {
  const { isLoading, message, variant } = useSelector(
    (state: RootState) => state.loader
  );

  if (!isLoading) return null;

  return <Loader message={message} variant={variant} />;
}
