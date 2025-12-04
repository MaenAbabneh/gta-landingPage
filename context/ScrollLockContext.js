"use client";

import { createContext, useContext, useEffect,useState } from "react";

import {
  isLocked as managerIsLocked,
  onLockChange,
  releaseScrollLock as managerReleaseScrollLock,
  requestScrollLock as managerRequestScrollLock,
} from "@/lib/scroll-manager";

const ScrollLockContext = createContext();

export const useScrollLockContext = () => useContext(ScrollLockContext);

export const ScrollLockProvider = ({ children }) => {
  const [isLocked, setIsLocked] = useState(!!managerIsLocked?.());

  // use manager as single source of truth; subscribe to updates
  useEffect(() => {
    // update initial state
    setIsLocked(!!managerIsLocked());
    const unsub = onLockChange((count) => {
      setIsLocked(count > 0);
      if (process.env.NODE_ENV === "development")
        console.debug("[ScrollLockContext] onLockChange - count", count);
    });

    return () => {
      unsub();
    };
  }, []);

  const requestLock = () => {
    if (process.env.NODE_ENV === "development")
      console.debug("[ScrollLockContext] requestLock (delegating to manager)");
    managerRequestScrollLock();
  };

  const releaseLock = () => {
    if (process.env.NODE_ENV === "development")
      console.debug("[ScrollLockContext] releaseLock (delegating to manager)");
    managerReleaseScrollLock();
  };

  useEffect(() => {
    return () => {
      // No-op. We don't want to try and change the manager’s count on unmount; owners should release locks.
    };
  }, []);

  return (
    <ScrollLockContext.Provider value={{ isLocked, requestLock, releaseLock }}>
      {children}
    </ScrollLockContext.Provider>
  );
};
