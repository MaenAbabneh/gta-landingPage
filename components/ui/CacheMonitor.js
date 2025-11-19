"use client";

import { useState, useEffect } from "react";
import { getCacheStats, getCachedUrls } from "@/lib/cacheManager";

/**
 * Cache Monitor Component - عرض إحصائيات Cache Storage
 * للاستخدام في Development فقط
 */
export default function CacheMonitor() {
  const [stats, setStats] = useState(null);
  const [cachedAssets, setCachedAssets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Update stats every 3 seconds
    const updateStats = async () => {
      const data = await getCacheStats();
      setStats(data);

      if (data.supported) {
        const urls = await getCachedUrls();
        // Extract filename from URL
        const assets = urls.map((url) => {
          const filename = url.split("/").pop().split("?")[0];
          return { url, filename };
        });
        setCachedAssets(assets);
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!stats?.supported) return null;

  const usageMB = (stats.storage.usage / (1024 * 1024)).toFixed(2);
  const quotaMB = (stats.storage.quota / (1024 * 1024)).toFixed(2);
  const percentage = (stats.storage.percentage * 100).toFixed(1);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        fontFamily: "monospace",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "#000",
          color: "#0f0",
          border: "2px solid #0f0",
          borderRadius: "8px",
          padding: "10px 15px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,255,0,0.3)",
        }}
      >
        📦 Cache: {stats.totalAssets} assets ({usageMB} MB)
      </button>

      {/* Expanded Panel */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "0",
            background: "#1a1a1a",
            color: "#fff",
            border: "2px solid #0f0",
            borderRadius: "12px",
            padding: "20px",
            minWidth: "400px",
            maxWidth: "500px",
            maxHeight: "500px",
            overflow: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              paddingBottom: "10px",
              borderBottom: "1px solid #333",
            }}
          >
            <h3 style={{ margin: 0, color: "#0f0" }}>Cache Storage Monitor</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#0f0",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Stats */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                background: "#2a2a2a",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#888" }}>
                Total Assets
              </div>
              <div
                style={{ fontSize: "24px", fontWeight: "bold", color: "#0f0" }}
              >
                {stats.totalAssets}
              </div>
            </div>

            <div
              style={{
                background: "#2a2a2a",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#888" }}>
                Storage Usage
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {usageMB} MB / {quotaMB} MB
              </div>
              <div
                style={{
                  marginTop: "8px",
                  height: "8px",
                  background: "#333",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: "100%",
                    background:
                      percentage > 80
                        ? "#f00"
                        : percentage > 50
                          ? "#ff0"
                          : "#0f0",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <div
                style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}
              >
                {percentage}% used
              </div>
            </div>
          </div>

          {/* Cached Assets List */}
          <div>
            <h4
              style={{ margin: "0 0 10px 0", color: "#0f0", fontSize: "14px" }}
            >
              Cached Assets ({cachedAssets.length})
            </h4>
            <div
              style={{
                maxHeight: "200px",
                overflow: "auto",
                background: "#2a2a2a",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {cachedAssets.length === 0 ? (
                <div
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  No assets cached yet. Scroll the page to cache videos.
                </div>
              ) : (
                cachedAssets.map((asset, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "8px",
                      marginBottom: "6px",
                      background: "#1a1a1a",
                      borderRadius: "4px",
                      fontSize: "11px",
                      wordBreak: "break-all",
                      borderLeft: "3px solid #0f0",
                    }}
                  >
                    {asset.filename}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cache Name */}
          <div
            style={{
              marginTop: "15px",
              paddingTop: "10px",
              borderTop: "1px solid #333",
              fontSize: "10px",
              color: "#666",
            }}
          >
            Cache: {stats.cacheName}
          </div>
        </div>
      )}
    </div>
  );
}
