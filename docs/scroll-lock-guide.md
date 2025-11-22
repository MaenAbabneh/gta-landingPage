# Scroll Lock System Documentation

This document provides a comprehensive guide to the scroll lock system used in this project. It's designed to programmatically control the page's scrolling behavior, which is essential for features like modals, overlays, and full-screen navigation menus.

## Overview

The system is built around a React Context (`ScrollLockContext`) and a lightweight `lib/scroll-manager` singleton that performs the actual DOM and Lenis management. The Context exposes `requestLock`/`releaseLock` and keeps a local state derived from the manager as an opt-in convenience for components. The manager is the single source of truth: it performs all DOM writes, Lenis stop/start and applies scrollbar compensation to avoid layout shifts.

## Core Components

- **`context/ScrollLockContext.js`**: This file defines `ScrollLockProvider` and the `useScrollLockContext` hook.
  - `ScrollLockProvider`: A component that wraps the application (or parts of it) to provide the scroll lock functionality. It manages the global `isLocked` state.
  - `useScrollLockContext`: A hook to access the scroll lock state (`isLocked`) and functions to modify it (`requestLock`/`releaseLock`). Prefer `requestLock`/`releaseLock` to avoid mismatches from direct state toggles.

- **`lib/scroll-manager.js`**: The singleton that implements the low-level lock logic. It exposes `requestScrollLock()`, `releaseScrollLock()`, `getLockCount()`, `isLocked()`, `onLockChange(callback)`, and `getScrollbarWidth()` for consumers.
  - `getScrollbarWidth()` is a robust measurement helper that:
    - first attempts `window.innerWidth - document.documentElement.clientWidth`,
    - then tries to measure a scroller candidate (`.lenis` or `document.scrollingElement`),
    - and finally falls back to measuring a temporary scrollable DIV.
- **`hooks/useScrollLock.js`**: A thin compatibility hook that delegates to the `lib/scroll-manager`.

## Setup

For the scroll lock system to be available throughout the application, the `ScrollLockProvider` must wrap the root layout. This is already configured in `app/layout.js`.

**`app/layout.js` example:**

```javascript
import { ScrollLockProvider } from "@/context/ScrollLockContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollLockProvider>
          {/* Other providers and components */}
          {children}
        </ScrollLockProvider>
      </body>
    </html>
  );
}
```

## How to Use

To control the scroll lock from any client component (`'use client'`), use the `useScrollLockContext` hook.

### Example: Locking scroll when a modal is open

Here is a typical example of how to use the system to lock scrolling when a modal component is displayed.

```javascript
"use client";

import { useState, useEffect } from "react";
import { useScrollLockContext } from "@/context/ScrollLockContext";

export default function MyComponentWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { requestLock, releaseLock } = useScrollLockContext();

  // Use useEffect to update the global scroll lock state
  // whenever the modal's open state changes.
  useEffect(() => {
    if (isModalOpen) requestLock();
    else releaseLock();

    // The main useScrollLock hook handles the cleanup,
    // but if you have component-specific cleanup, do it here.
    return () => {
      // Ensure scroll is unlocked when component unmounts
      releaseLock();
    };
  }, [isModalOpen]);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>Page scrolling is now locked.</p>
            <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Key Steps:

1.  **Import Hook**: Import `useScrollLockContext` from `@/context/ScrollLockContext`.
2.  **Get Setter Function**: Destructure `requestLock` and `releaseLock` from the context hook: `const { requestLock, releaseLock } = useScrollLockContext();`.
3.  **Control State**: Use `requestLock()` to request a lock and `releaseLock()` to release it. It's best practice to tie this to a component's state (e.g., `isModalOpen`) within a `useEffect` hook so the lock state is always synchronized with your UI.

## Notes & Advanced Behavior

- Single source of truth: `lib/scroll-manager` is the authoritative codepath for applying `overflow: hidden`, managing Lenis `stop()`/`start()`, and applying scrollbar compensation (padding) to the appropriate element.
- Scroller-aware: If the page uses a dedicated scroller (e.g., Lenis container with `.lenis`), the manager prefers to apply the padding compensation to that scroller rather than `document.body` to minimize layout artifacts.
- Measurement strategy: scrollbar width is measured in three steps (diff, scroller candidate, fallback). This improves reliability across platforms (classic vs overlay scrollbars) and containerized scrolling.
- SSR & Hydration: To avoid flicker, this repo sets a `loading-active` class on the `<html>` SSR output to hide the scrollbar on first paint; `Loading` removes it on animation complete. The manager applies compensation when the lock is requested and restores original inline styles on release.
- Dev tools: For development, a debug overlay (`ScrollDebugOverlay`) shows `lockCount`, `isLocked`, `scrollbarWidth`, which measurement method was used, and scroller candidate info. Rendered only in dev to help debug layout shifts.

## Troubleshooting & Best Practices

- Avoid `100vw` on full-width elements: `100vw` includes the scrollbar width and will cause a visual shift when the scrollbar is hidden; prefer `left: 0; right: 0;` or `width: 100%` inside a container.
- Ensure `html` and `body` background colors match the overlay background to avoid visible bands when adding padding compensation.
- Apply compensation to a content wrapper (like `.main-content`) when possible, rather than globally to `body`, to reduce the chance of exposing structural backgrounds.
- Handle RTL: The manager uses `padding-left` for `rtl` pages if the scrollbar is on the left side.
- Recompute on resize: The manager measures scrollbar width on request; enabling a resize listener during an active lock can keep compensation accurate if the layout changes while the overlay remains open.
- Pair requests/releases: Always pair `requestLock()` and `releaseLock()` per component life cycle. If an overlay requests a lock, ensure it releases it on close or component unmount.
