import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUser } from "./actions";

let cachedUser = null;
let subscribers = [];

export default function useCurrentUser() {
  const [user, setUser] = useState(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  const notifySubscribers = useCallback((userData) => {
    subscribers.forEach((callback) => callback(userData));
  }, []);

  const getAuthToken = useCallback(async () => {
    if (cachedUser) return;

    try {
      const userData = await fetchCurrentUser();
      cachedUser = userData;
      setUser(userData);
      notifySubscribers(userData);
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setLoading(false);
    }
  }, [notifySubscribers]);

  useEffect(() => {
    if (!cachedUser) {
      getAuthToken();
    } else {
      setUser(cachedUser);
      setLoading(false);
    }

    const updateState = (userData) => {
      setUser(userData);
    };

    subscribers.push(updateState);

    return () => {
      subscribers = subscribers.filter((callback) => callback !== updateState);
    };
  }, [getAuthToken]);

  return { isLoggedIn: !!user?.id, ...user, loading };
}
