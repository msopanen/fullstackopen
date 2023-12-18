import { useEffect, useState } from "react";

export const USER_VAULT = "fi.fullstackopen.user";

const getStoredUser = () => {
  const stored = window.localStorage.getItem(USER_VAULT);
  return JSON.parse(stored) || null;
};

const setStoredUser = (user) => {
  window.localStorage.setItem(USER_VAULT, JSON.stringify(user));
};

const removeStoredUser = () => {
  window.localStorage.removeItem(USER_VAULT);
};

export const useUser = () => {
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    if (user) {
      setStoredUser(user);
    } else {
      removeStoredUser();
    }
  }, [user]);

  const clearUser = () => setUser(null);

  return [user, setUser, clearUser];
};
