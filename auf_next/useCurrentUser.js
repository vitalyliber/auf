import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUser } from "@/auf_next/actions";

export default function useCurrentUser() {
  const [user, setUser] = useState({});

  const getAuthToken = useCallback(async () => {
    const userData = await fetchCurrentUser() || {};

    setUser(userData);
  }, []);

  useEffect(() => {
    getAuthToken().catch();
  }, [getAuthToken]);


  return { isLoggedIn: !!user?.id, ...user };
}
