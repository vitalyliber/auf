import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUser } from "./actions";

let cachedUser = null;
let isFetching = false;

export default function useCurrentUser() {
  const [user, setUser] = useState(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  const getAuthToken = useCallback(async () => {
    if (cachedUser || isFetching) return;

    isFetching = true;
    try {
      const userData = await fetchCurrentUser();
      cachedUser = userData;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      isFetching = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!cachedUser) {
      getAuthToken().catch(() => setLoading(false));
    }
  }, [getAuthToken]);

  return { isLoggedIn: !!user?.id, ...user, loading };
}
