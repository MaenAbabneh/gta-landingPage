import { Cloudinary } from "@cloudinary/url-gen";

let _cldInstance;

export function cld() {
  if (!_cldInstance) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME env var. Cloudinary URLs will be invalid."
        );
      }
    }
    _cldInstance = new Cloudinary({ cloud: { cloudName } });
  }
  return _cldInstance;
}

export function buildImageUrl(publicId, videoThumbnail = false) {
  if (!publicId) return null;
  try {
    if (videoThumbnail === true) {
      return cld().video(publicId).videoThumbnail().toURL();
    } else {
      return cld().image(publicId).format("auto").quality("auto").toURL();
    }
  } catch {
    return null;
  }
}

// بناء placeholder للصورة (blur-up) - بنفس النسبة لكن حجم صغير وجودة منخفضة
export function buildImagePlaceholder(publicId) {
  if (!publicId) return null;
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlgi2ockk";
  // w_100 = عرض 100px (صغير لكن يكفي للـ blur)
  // q_1 = أقل جودة ممكنة (1%)
  // e_blur:2000 = blur قوي جداً
  // f_auto = format تلقائي (webp/avif)
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_100,q_1,f_auto,e_blur:2000/${publicId}`;
}

export function buildVideoUrl(publicId) {
  if (!publicId) return null;
  try {
    return cld().video(publicId).format("mp4").toURL();
  } catch {
    return null;
  }
}

// توليد thumbnail لفيديو (صورة من إطار محدد - افتراضياً آخر إطار)
export function buildVideoThumbnail(publicId, options = {}) {
  if (!publicId) return null;
  // time: يمكن أن يكون قيمة بالثواني "3.2" أو نسبة مئوية "99p" أو "end" لآخر إطار
  const { time = "end", width = 1920, quality = "auto:best" } = options;
  try {
    return cld()
      .video(publicId)
      .setAssetType("video")
      .addTransformation(`so_${time}/w_${width}/q_${quality}/f_auto`)
      .toURL()
      .replace(/\.(mp4|webm|mov)$/, ".jpg");
  } catch {
    return null;
  }
}

export function buildResponsiveVideoUrls(publicId) {
  if (!publicId) return null;
  try {
    return {
      mobile: cld().video(publicId).format("mp4").toURL(),
      tablet: cld().video(publicId).format("mp4").toURL(),
      desktop: cld().video(publicId).format("mp4").toURL(),
    };
  } catch {
    return null;
  }
}
