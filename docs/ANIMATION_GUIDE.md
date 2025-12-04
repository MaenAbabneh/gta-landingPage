# 🎬 Animation System Guide

This guide details the implementation of the core visual feature: **Scroll-Driven Video Scrubbing**.

## Core Concept: Canvas Scrubbing

Browsers struggle to seek HTML5 Video frame-by-frame smoothly during scroll. To solve this, we use a **Canvas Proxy** technique.

### The Pipeline

1.**Load:** Video loads in a hidden `<video>` element.
2.  **Sync:** GSAP `ScrollTrigger` maps the scroll distance (pixels) to video duration (seconds).
3.  **Render:** A `gsap.ticker` or `onUpdate` callback draws the current video frame to a `<canvas>` element.

## Implementation Details

### The Hook: `useVideoAnimation`

Located in `hooks/animation/useVideoAnimation.js`.

```javascript
export function useVideoAnimation(refs, videoSrc, config) {
  // 1. Setup Context
  const context = canvas.getContext("2d");

  // 2. Create Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      scrub: true, // Links animation progress to scrollbar
      pin: true, // Locks the section in place
    },
  });

  // 3. The Scrubbing Logic
  tl.to(video, {
    currentTime: video.duration,
    onUpdate: () => {
      // Draw the frame corresponding to current scroll position
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    },
  });
}
```

### Configuration Options

| Option          | Default  | Description                                         |
| :-------------- | :------- | :-------------------------------------------------- |
| `videoStart`    | `0.2`    | Progress (0-1) where video starts moving            |
| `videoEnd`      | `0.9`    | Progress (0-1) where video stops                    |
| `sectionPinEnd` | `+=300%` | How long the section stays pinned (scroll distance) |
| `maskImages`    | `{...}`  | CSS mask gradients for text/overlay transitions     |

## Complex Sequences: Vice City Overlay

The `overlay-viceCity.js` component demonstrates advanced GSAP usage:

1. **FLIP (First Last Invert Play):** Used for the modal expansion effect.
2. **Timeline Orchestration:**
    - Button Rotation -> Background Fade -> Content Slide -> Gallery Stagger.
3. **Cleanup:**
    - Uses `gsap.context()` (via `@gsap/react`) to automatically kill animations on unmount.
    - Resets `will-change` properties to free up GPU memory.

## Best Practices

1. **Always use `useGSAP`:** This wrapper handles React Strict Mode double-invocations and cleanup automatically.
2. **Prefer `transform`:** Never animate `top`, `left`, `margin`. Use `x`, `y`, `xPercent`.
3. **Force 3D:** For elements that flicker, add `force3D: true` or `z: 0.01` to promote them to a compositor layer.
4. **Lazy Canvas:** The canvas context is expensive. Only create it once inside a `useEffect`.
