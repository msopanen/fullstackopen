import { useEffect, useState } from "react";

const LOCAL_STORAGE_USER = "fi.fullstackopen.token";

const getStoredUser = () => {
  const stored = window.localStorage.getItem(LOCAL_STORAGE_USER);
  return JSON.parse(stored) || null;
};

const setStoredUser = (user) => {
  window.localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
};

const removeStoredUser = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_USER);
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
