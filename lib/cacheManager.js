// Cache Storage API manager for offline-first asset caching
// Supports videos, images with quota management and versioning

const CACHE_VERSION = "v1";
const CACHE_NAME = `gta-assets-${CACHE_VERSION}`;
const MAX_CACHE_SIZE = 500 * 1024 * 1024; // 500MB hard limit
const CACHE_QUOTA_THRESHOLD = 0.8; // 80% of available storage

// Track failed URLs to avoid retrying
const failedUrls = new Set();

/**
 * Check if Cache Storage API is available
 */
export function isCacheSupported() {
  return typeof caches !== "undefined";
}

/**
 * Get current storage usage and quota
 * @returns {Promise<{usage: number, quota: number, percentage: number}>}
 */
export async function getStorageInfo() {
   
  if (typeof navigator === "undefined" || !navigator.storage?.estimate) {
    return { usage: 0, quota: 0, percentage: 0 };
  }

  try {
    // eslint-disable-next-line compat/compat
    const { usage = 0, quota = 0 } = await navigator.storage.estimate();
    return {
      usage,
      quota,
      percentage: quota > 0 ? usage / quota : 0,
    };
  } catch {
    return { usage: 0, quota: 0, percentage: 0 };
  }
}

/**
 * Check if we have enough space to cache
 * @returns {Promise<boolean>}
 */
export async function hasStorageSpace() {
  const { usage, quota, percentage } = await getStorageInfo();

  // Check percentage threshold
  if (percentage > CACHE_QUOTA_THRESHOLD) return false;

  // Check hard limit
  if (usage > MAX_CACHE_SIZE) return false;

  return true;
}

/**
 * Cache an asset (video or image)
 * @param {string} url - Asset URL to cache
 * @param {Object} options - Caching options
 * @returns {Promise<boolean>} Success status
 */
export async function cacheAsset(url, options = {}) {
  if (!isCacheSupported()) return false;
  if (!url) return false;

  // Skip URLs that failed before
  if (failedUrls.has(url)) {
    return false;
  }

  const { skipQuotaCheck = false } = options;

  try {
    // Check storage before caching
    if (!skipQuotaCheck) {
      const hasSpace = await hasStorageSpace();
      if (!hasSpace) {
        if (process.env.NODE_ENV === "development") {
          console.warn("⚠️ Storage quota exceeded, skipping cache for:", url);
        }
        return false;
      }
    }

    const cache = await caches.open(CACHE_NAME);

    // Check if already cached
    const cached = await cache.match(url);
    if (cached) {
      return true; // Already cached
    }

    // Fetch and cache
    const response = await fetch(url, {
      mode: "cors",
      cache: "default",
      credentials: "omit",
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Failed to fetch ${url}: ${response.status}`);
      }
      failedUrls.add(url); // Don't retry this URL
      return false;
    }

    // Check if response is valid for caching (not opaque)
    if (response.type === "opaque" || response.status === 0) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Cannot cache opaque response for: ${url}`);
      }
      failedUrls.add(url); // Don't retry this URL
      return false;
    }

    // Clone response before caching (response can only be read once)
    await cache.put(url, response.clone());

    return true;
  } catch (error) {
    // Silently fail - cache is optional, don't break the app
    failedUrls.add(url); // Don't retry this URL
    if (process.env.NODE_ENV === "development") {
      console.warn("Cache error (non-critical):", error.message);
    }
    return false;
  }
}

/**
 * Get cached asset
 * @param {string} url - Asset URL
 * @returns {Promise<Response|null>}
 */
export async function getCachedAsset(url) {
  if (!isCacheSupported()) return null;
  if (!url) return null;

  try {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(url);
  } catch {
    return null;
  }
}

/**
 * Check if asset is cached
 * @param {string} url - Asset URL
 * @returns {Promise<boolean>}
 */
export async function isCached(url) {
  const cached = await getCachedAsset(url);
  return cached !== null;
}

/**
 * Delete specific cached asset
 * @param {string} url - Asset URL to delete
 * @returns {Promise<boolean>}
 */
export async function deleteCachedAsset(url) {
  if (!isCacheSupported()) return false;

  try {
    const cache = await caches.open(CACHE_NAME);
    return await cache.delete(url);
  } catch {
    return false;
  }
}

/**
 * Clear all cached assets
 * @returns {Promise<boolean>}
 */
export async function clearAllCache() {
  if (!isCacheSupported()) return false;

  try {
    return await caches.delete(CACHE_NAME);
  } catch {
    return false;
  }
}

/**
 * Get all cached URLs
 * @returns {Promise<string[]>}
 */
export async function getCachedUrls() {
  if (!isCacheSupported()) return [];

  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    return requests.map((req) => req.url);
  } catch {
    return [];
  }
}

/**
 * Clean old cache versions
 * @returns {Promise<void>}
 */
export async function cleanOldCaches() {
  if (!isCacheSupported()) return;

  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name.startsWith("gta-assets-") && name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    );
  } catch (error) {
    console.error("Failed to clean old caches:", error);
  }
}

/**
 * Batch cache multiple assets with progress tracking
 * @param {string[]} urls - Array of asset URLs
 * @param {Function} onProgress - Progress callback (current, total)
 * @returns {Promise<{success: number, failed: number}>}
 */
export async function cacheAssets(urls, onProgress) {
  if (!isCacheSupported() || !urls?.length) {
    return { success: 0, failed: 0 };
  }

  let success = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const cached = await cacheAsset(url);

    if (cached) {
      success++;
    } else {
      failed++;
    }

    onProgress?.(i + 1, urls.length);
  }

  return { success, failed };
}

/**
 * Get cache statistics
 * @returns {Promise<Object>}
 */
export async function getCacheStats() {
  if (!isCacheSupported()) {
    return {
      supported: false,
      totalAssets: 0,
      storage: { usage: 0, quota: 0, percentage: 0 },
    };
  }

  const urls = await getCachedUrls();
  const storage = await getStorageInfo();

  return {
    supported: true,
    totalAssets: urls.length,
    storage,
    cacheName: CACHE_NAME,
  };
}

/**
 * Get the list of URLs that previously failed caching (tracked in-memory)
 * @returns {Promise<string[]>}
 */
export async function getFailedUrls() {
  try {
    return Array.from(failedUrls);
  } catch {
    return [];
  }
}

/**
 * Clear the list of failed URLs tracked by the cache manager.
 * Useful for debugging and re-trying previously failed assets.
 * @returns {Promise<boolean>}
 */
export async function clearFailedUrls() {
  try {
    failedUrls.clear();
    return true;
  } catch {
    return false;
  }
}
