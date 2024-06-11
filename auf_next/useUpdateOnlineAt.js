import { useEffect } from "react";
import { updateOnlineAt } from "@/auf_next/actions";

export default function useUpdateOnlineAt() {
  useEffect(() => {
    updateOnlineAt().catch();
  }, []);
}
