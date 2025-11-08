"use client";

import { useEffect, useState } from "react";
import {
  prebuiltassets,
  JasonImage,
  LuciaImage,
  CalImage,
  ViceCityImage,
} from "@/constants/assest";
import { getScreenSize } from "@/hooks/useResponsive";

export default function TestPage() {
  const [results, setResults] = useState({});
  const [screenSize, setScreenSize] = useState("");

  useEffect(() => {
    const testResults = {};

    // 1️⃣ اختبار prebuiltassets
    testResults.prebuiltassetsLength = prebuiltassets?.length || 0;
    testResults.isArray = Array.isArray(prebuiltassets);
    testResults.firstAsset = prebuiltassets?.[0];
    testResults.firstVideoAsset = prebuiltassets?.find(
      (a) => a.type === "video"
    );
    testResults.firstImageAsset = prebuiltassets?.find(
      (a) => a.type === "image"
    );

    // 2️⃣ اختبار JasonImage
    testResults.jasonImage1HasUrl = !!JasonImage?.Image_1?.url;
    testResults.jasonImage1Url = JasonImage?.Image_1?.url;
    testResults.jasonImage1HasSrc = !!JasonImage?.Image_1?.src;
    testResults.jasonImage1HasAlt = !!JasonImage?.Image_1?.alt;
    testResults.jasonViewer1HasUrl = !!JasonImage?.Viwer_1?.url;

    // 3️⃣ اختبار ViceCityImage
    testResults.viceCityImage1HasUrl = !!ViceCityImage?.Image_1?.url;
    testResults.viceCityViewer1HasUrl = !!ViceCityImage?.Viewer_1?.url;

    // 4️⃣ اختبار LuciaImage
    testResults.luciaImage1HasUrl = !!LuciaImage?.Image_1?.url;

    // 5️⃣ اختبار CalImage
    testResults.calImage1HasUrl = !!CalImage?.Image_1?.url;

    // 6️⃣ اختبار getScreenSize
    const size = getScreenSize();
    setScreenSize(size);
    testResults.screenSize = size;

    setResults(testResults);
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "monospace",
        backgroundColor: "#1a1a1a",
        color: "#00ff00",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#00ffff", marginBottom: "2rem" }}>
        🧪 نتائج اختبار الدوال
      </h1>

      {/* 1️⃣ prebuiltassets */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "2px solid #00ff00",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#ffff00" }}>1️⃣ prebuiltassets</h2>
        <div>
          ✓ عدد العناصر: <strong>{results.prebuiltassetsLength}</strong>
        </div>
        <div>
          ✓ نوع البيانات:{" "}
          <strong>{results.isArray ? "Array ✅" : "Not Array ❌"}</strong>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong>أول عنصر:</strong>
          <pre
            style={{
              backgroundColor: "#000",
              padding: "1rem",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(results.firstAsset, null, 2)}
          </pre>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong>أول فيديو:</strong>
          <pre
            style={{
              backgroundColor: "#000",
              padding: "1rem",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(results.firstVideoAsset, null, 2)}
          </pre>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong>أول صورة:</strong>
          <pre
            style={{
              backgroundColor: "#000",
              padding: "1rem",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(results.firstImageAsset, null, 2)}
          </pre>
        </div>
      </section>

      {/* 2️⃣ JasonImage */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "2px solid #00ff00",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#ffff00" }}>2️⃣ JasonImage</h2>
        <div>
          ✓ Image_1 لديه url:{" "}
          <strong>{results.jasonImage1HasUrl ? "✅" : "❌"}</strong>
        </div>
        <div>
          ✓ Image_1 لديه src:{" "}
          <strong>{results.jasonImage1HasSrc ? "✅" : "❌"}</strong>
        </div>
        <div>
          ✓ Image_1 لديه alt:{" "}
          <strong>{results.jasonImage1HasAlt ? "✅" : "❌"}</strong>
        </div>
        <div>
          ✓ Viwer_1 لديه url:{" "}
          <strong>{results.jasonViewer1HasUrl ? "✅" : "❌"}</strong>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong>Image_1 URL:</strong>
          <div
            style={{
              backgroundColor: "#000",
              padding: "0.5rem",
              borderRadius: "4px",
              wordBreak: "break-all",
              fontSize: "0.8rem",
            }}
          >
            {results.jasonImage1Url || "N/A"}
          </div>
        </div>
      </section>

      {/* 3️⃣ ViceCityImage */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "2px solid #00ff00",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#ffff00" }}>3️⃣ ViceCityImage</h2>
        <div>
          ✓ Image_1 لديه url:{" "}
          <strong>{results.viceCityImage1HasUrl ? "✅" : "❌"}</strong>
        </div>
        <div>
          ✓ Viewer_1 لديه url:{" "}
          <strong>{results.viceCityViewer1HasUrl ? "✅" : "❌"}</strong>
        </div>
      </section>

      {/* 4️⃣ LuciaImage */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "2px solid #00ff00",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#ffff00" }}>4️⃣ LuciaImage</h2>
        <div>
          ✓ Image_1 لديه url:{" "}
          <strong>{results.luciaImage1HasUrl ? "✅" : "❌"}</strong>
        </div>
      </section>

      {/* 5️⃣ CalImage */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "2px solid #00ff00",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#ffff00" }}>5️⃣ CalImage</h2>
        <div>
          ✓ Image_1 لديه url:{" "}
          <strong>{results.calImage1HasUrl ? "✅" : "❌"}</strong>
        </div>
      </section>

      {/* 6️⃣ getScreenSize */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "2px solid #00ff00",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#ffff00" }}>6️⃣ getScreenSize()</h2>
        <div>
          ✓ حجم الشاشة الحالي:{" "}
          <strong style={{ fontSize: "1.5rem" }}>{screenSize}</strong>
        </div>
        <div style={{ marginTop: "0.5rem", color: "#888" }}>
          (قم بتغيير حجم النافذة لرؤية التغيير)
        </div>
      </section>

      {/* الخلاصة */}
      <section
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          border: "3px solid #00ffff",
          borderRadius: "8px",
          backgroundColor: "#003333",
        }}
      >
        <h2 style={{ color: "#00ffff", marginBottom: "1rem" }}>📊 الخلاصة</h2>
        <div style={{ fontSize: "1.2rem" }}>
          {results.isArray &&
          results.prebuiltassetsLength > 0 &&
          results.jasonImage1HasUrl &&
          results.viceCityImage1HasUrl &&
          results.luciaImage1HasUrl &&
          results.calImage1HasUrl ? (
            <div style={{ color: "#00ff00", fontWeight: "bold" }}>
              ✅ جميع الاختبارات نجحت!
            </div>
          ) : (
            <div style={{ color: "#ff0000", fontWeight: "bold" }}>
              ❌ بعض الاختبارات فشلت
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
