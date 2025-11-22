import { Cloudinary } from "@cloudinary/url-gen";

let _cldInstance;

export function cld() {
  if (!_cldInstance) {
    let cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME env var. Cloudinary URLs will be invalid."
        );
      }
      // fallback to the public demo cloud name used in the project
      cloudName = "dlgi2ockk";
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
  const { time = "end", width = 1920, quality = "auto:best" } = options;
  try {
    let thumb = cld().video(publicId).videoThumbnail();
    thumb = thumb.format("auto").quality(quality);
    if (width) {
      thumb = thumb.addTransformation(`w_${width}`);
    }
    return thumb.toURL();
  } catch (e) {
    return null;
  }
}

export function buildResponsiveVideoUrls(publicIdOrObject) {
  if (!publicIdOrObject) return null;
  try {
    const isObject = typeof publicIdOrObject === "object" && publicIdOrObject !== null;
    const getId = (key) => {
      if (isObject) return publicIdOrObject[key] || publicIdOrObject.desktop || publicIdOrObject.default || null;
      return publicIdOrObject;
    };

    // Prefer explicit per-breakpoint IDs. If not provided, fall back in the
    // order: desktop -> tablet -> mobile. This ensures a video URL exists even
    // when only `mobile` is provided.
    const desktopId = getId("desktop") || getId("tablet") || getId("mobile");
    const tabletId = getId("tablet") || desktopId || getId("mobile");
    const mobileId = getId("mobile") || tabletId || desktopId;

    return {
      mobile: mobileId ? cld().video(mobileId).format("mp4").toURL() : null,
      tablet: tabletId ? cld().video(tabletId).format("mp4").toURL() : null,
      desktop: desktopId ? cld().video(desktopId).format("mp4").toURL() : null,
    };
  } catch {
    return null;
  }
}
