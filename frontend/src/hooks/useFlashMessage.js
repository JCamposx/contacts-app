import colorType from "@/assets/js/colorType";
import { useEffect, useState } from "react";

export function useFlashMessage() {
  const [flashMessage, setFlashMessage] = useState({});

  useEffect(() => {
    if (localStorage.getItem("flashMessage")) {
      setFlashMessage({
        type: colorType.info,
        message: localStorage.getItem("flashMessage"),
      });
      localStorage.removeItem("flashMessage");
    }
  }, []);

  return [flashMessage];
}
