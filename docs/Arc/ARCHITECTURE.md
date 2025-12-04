# 🏛️ System Architecture & Design Patterns

> **Project:** Grand Theft Auto VI - Web Experience Clone  
> **Version:** 1.0.0  
> **Architectural Style:** Component-Based, Event-Driven Animation Pipeline  

## 1. High-Level Architecture Diagram

This project follows a **Hybrid Rendering Architecture** where standard UI components live in the DOM, while performance-critical media sequences (like the Vice City scrubber) utilize a Canvas/WebGL pipeline driven by GSAP.

```mermaid
graph TD
    User[User Scroll/Interaction] -->|Input| ScrollManager[Lenis Smooth Scroll]
    ScrollManager -->|Sync| ScrollTrigger[GSAP ScrollTrigger]
    
    subgraph "Animation Layer (Hooks)"
        ScrollTrigger -->|Update| UseHero[useHeroAnimation]
        ScrollTrigger -->|Update| UseVideo[useVideoPlaceAnimation]
        ScrollTrigger -->|Update| UseOverlay[useNavOverlayAnimation]
    end
    
    subgraph "Rendering Layer"
        UseHero -->|Transform/Opacity| DOM[DOM Elements (React Tree)]
        UseVideo -->|DrawImage| Canvas[HTML5 Canvas (Off-Main-Thread)]
        UseOverlay -->|FLIP| Layout[Layout Changes]
    end
    
    subgraph "Data Layer"
        Assets[Cloudinary CDN] -->|Lazy Load| LazyHooks[useLazyVideo / useLazyImage]
        LazyHooks -->|Cache| ServiceWorker[Cache Storage API]
    end
```

## 2. Project Structure & Responsibility

The codebase is organized by Feature Verticality rather than purely by file type, ensuring scalability.

```
src/
├── app/                    # Next.js 15 App Router (Pages & Layouts)
│   ├── layout.js           # Global Providers (Lenis, ScrollLock)
│   └── page.js             # Composition Root (Hero -> Intro -> Vice City)
│
├── components/             # Visual Components (Passive UI)
│   ├── sections/           # Large page sections (Smart Components)
│   │   ├── hero.js
│   │   ├── vice-city/
│   │   └── footer.js
│   ├── ui/                 # Reusable atoms (Buttons, SVG, Video Players)
│   └── navigation/         # Nav & Overlay Complex Logic
│
├── hooks/                  # Logic Layer (The Brains)
│   ├── animation/          # GSAP Logic separated from UI (Headless Animation)
│   │   ├── useHeroAnimetion.js
│   │   └── useVideoPlaceAnimation.js
│   ├── useLazyVideo.js     # Asset fetching strategy
│   └── useScrollLock.js    # Body scroll management
│
├── context/                # Global State
│   ├── ScrollLockContext.js # Mutually exclusive overlay management
│   └── TrailerContext.js    # Global media playback state
│
└── lib/                    # Core Utilities
    ├── cacheManager.js     # IndexedDB/Cache API wrappers
    ├── gsap-lenis.js       # Scroll-Animation Synchronization
    └── utils.js            # Tailwind helpers (cn)
```

## 3. Core Design Patterns

### A. Headless Animation Pattern
We decouple animation logic from the JSX render tree.  
**Why?** Keeps components clean and allows reusing animation logic.  
**Implementation:**  
- **Hook:** hooks/animation/useHeroAnimetion.js defines the Timeline.  
- **Component:** components/sections/hero.js provides the Refs.  
- **Binding:** The component passes refs to the hook, which returns nothing but orchestrates side effects.  

### B. Canvas Proxy Rendering (Video Scrubbing)
To avoid the browser's video decoding latency during scroll:  
- **Source:** A `<video>` element loads the asset but is hidden (display: none).  
- **Proxy:** GSAP interpolates a frame variable based on scroll position.  
- **Render:** On each tick, we draw the current video frame onto a `<canvas>`.  
**Reference:** hooks/animation/useVideoPlaceAnimation.js.  

### C. Performance Optimization Strategy
We strictly adhere to the "Composite-Only" rule for animations to ensure 60fps.  
| Property          | Usage        | Reason                                   |
|-------------------|--------------|------------------------------------------|
| transform         | Heavy Usage  | GPU Accelerated (Cheap)                  |
| opacity           | Heavy Usage  | GPU Accelerated (Cheap)                  |
| background-position| Forbidden    | Causes Repaint (Expensive)               |
| width/height      | Forbidden    | Causes Layout Thrashing (Expensive)      |
| will-change       | Strategic    | Used in overlay-viceCity.js for layer promotion |

### D. Asset Delivery Pipeline
- **Cloudinary:** Serves optimized formats (WebP/AVIF).  
- **Precaching:** lib/cacheManager.js proactively fetches next-section assets.  
- **Lazy Loading:** useLazyVideo uses IntersectionObserver to fetch high-res assets only when approaching viewport.  

## 4. State Management (Context Architecture)
We use React Context sparingly, only for global coordination that props cannot solve.  
- **ScrollLockContext:**  
  **Problem:** Multiple overlays (Nav, Vice City, Trailer) trying to lock the body scroll simultaneously causing race conditions.  
  **Solution:** A centralized semaphore system that counts locks and releases body scroll only when the count is zero.