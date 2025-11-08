// ملف اختبار مؤقت للتحقق من الدوال
import {
  buildImageUrl,
  buildVideoUrl,
  buildResponsiveVideoUrls,
} from "./lib/cloudinary.js";

console.log("🧪 اختبار الدوال...\n");

// 1️⃣ اختبار buildImageUrl
console.log("1️⃣ اختبار buildImageUrl:");
const imageUrl = buildImageUrl("Jason_Duval_01_kacoeq");
console.log("   ✓ imageUrl:", imageUrl);
console.log("   ✓ نوع النتيجة:", typeof imageUrl);
console.log(
  "   ✓ يحتوي على cloudinary:",
  imageUrl?.includes("cloudinary") ? "✅" : "❌"
);
console.log("");

// 2️⃣ اختبار buildVideoUrl
console.log("2️⃣ اختبار buildVideoUrl:");
const videoUrl = buildVideoUrl("intro_ff13rf");
console.log("   ✓ videoUrl:", videoUrl);
console.log("   ✓ نوع النتيجة:", typeof videoUrl);
console.log(
  "   ✓ يحتوي على cloudinary:",
  videoUrl?.includes("cloudinary") ? "✅" : "❌"
);
console.log("");

// 3️⃣ اختبار buildResponsiveVideoUrls
console.log("3️⃣ اختبار buildResponsiveVideoUrls:");
const responsiveUrls = buildResponsiveVideoUrls("intro_ff13rf");
console.log("   ✓ responsiveUrls:", JSON.stringify(responsiveUrls, null, 2));
console.log("   ✓ نوع النتيجة:", typeof responsiveUrls);
console.log("   ✓ يحتوي على mobile:", responsiveUrls?.mobile ? "✅" : "❌");
console.log("   ✓ يحتوي على tablet:", responsiveUrls?.tablet ? "✅" : "❌");
console.log("   ✓ يحتوي على desktop:", responsiveUrls?.desktop ? "✅" : "❌");
console.log("");

// 4️⃣ اختبار prebuiltassets
console.log("4️⃣ فحص prebuiltassets:");
import("./constants/assest.js").then((module) => {
  const { prebuiltassets, JasonImage, ViceCityImage } = module;

  console.log("   ✓ عدد العناصر في prebuiltassets:", prebuiltassets?.length);
  console.log("   ✓ أول عنصر:", JSON.stringify(prebuiltassets?.[0], null, 2));
  console.log(
    "   ✓ نوع prebuiltassets:",
    Array.isArray(prebuiltassets) ? "Array ✅" : "Not Array ❌"
  );
  console.log("");

  console.log("5️⃣ فحص JasonImage:");
  console.log("   ✓ JasonImage.Image_1.url:", JasonImage?.Image_1?.url);
  console.log("   ✓ JasonImage.Viwer_1.url:", JasonImage?.Viwer_1?.url);
  console.log("   ✓ يحتوي على src:", JasonImage?.Image_1?.src ? "✅" : "❌");
  console.log("   ✓ يحتوي على url:", JasonImage?.Image_1?.url ? "✅" : "❌");
  console.log("   ✓ يحتوي على alt:", JasonImage?.Image_1?.alt ? "✅" : "❌");
  console.log("");

  console.log("6️⃣ فحص ViceCityImage:");
  console.log("   ✓ ViceCityImage.Image_1.url:", ViceCityImage?.Image_1?.url);
  console.log("   ✓ ViceCityImage.Viewer_1.url:", ViceCityImage?.Viewer_1?.url);
  console.log("");

  console.log("✅ جميع الاختبارات اكتملت!");
});
