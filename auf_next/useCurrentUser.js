import { useEffect } from "react";
import { fetchCurrentUser } from "./actions";

import { useStore } from "@nanostores/react";
import { $user, addUser } from "./store";
let isFetching = false;
let cachedUser = null;

export default function useCurrentUser() {
  const user = useStore($user);

  const fetchUser = async () => {
    if (isFetching || cachedUser) return;
    console.log("Fetching the Auf user...");

    isFetching = true;
    try {
      const userData = await fetchCurrentUser();
      addUser(userData);
      cachedUser = userData;
      console.log("The Auf user fetched successfully!");
    } catch (error) {
      console.error("Failed to fetch the Auth user", error);
    } finally {
      isFetching = false;
    }
  };

  useEffect(() => {
    fetchUser().catch(() => (isFetching = false));
  }, []);

  return { isLoggedIn: !!user?.id, ...user, loading: isFetching };
}
