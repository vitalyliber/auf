import { useEffect } from "react";
import { updateOnlineAt } from "@/auf_next";

export default function useUpdateOnlineAt() {
  useEffect(() => {
    updateOnlineAt().catch();
  }, []);
}
