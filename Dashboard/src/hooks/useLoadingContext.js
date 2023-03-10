import { LoadingContext } from "../context/LoadingContext";
import { useContext } from "react";

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw Error("useLoadingContext must be used inside an AuthLoadingProvider");
  }

  return context;
};
