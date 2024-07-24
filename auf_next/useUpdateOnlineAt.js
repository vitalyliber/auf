import { useEffect } from "react";
import { updateOnlineAt } from "./updateOnlineAt";

export default function useUpdateOnlineAt() {
  useEffect(() => {
    updateOnlineAt().catch();
  }, []);
}
