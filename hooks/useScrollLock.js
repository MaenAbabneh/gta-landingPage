"use client";

import { useEffect, useRef } from "react";
import {
  requestScrollLock as managerRequestScrollLock,
  releaseScrollLock as managerReleaseScrollLock,
} from "@/lib/scroll-manager";

/**
 * Deprecated hook: delegating to scroll-manager to avoid DOM duplication.
 * @param {boolean} isLocked
 */
export function useScrollLock(isLocked) {
  const didRequestRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLocked) {
      if (!didRequestRef.current) {
        managerRequestScrollLock();
        didRequestRef.current = true;
      }
    } else {
      if (didRequestRef.current) {
        managerReleaseScrollLock();
        didRequestRef.current = false;
      }
    }

    return () => {
      if (didRequestRef.current) {
        managerReleaseScrollLock();
        didRequestRef.current = false;
      }
    };
  }, [isLocked]);
}
