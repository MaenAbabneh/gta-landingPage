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
    // Pass the requested time to videoThumbnail when provided.
    // Many Cloudinary SDKs accept an options object here (timestamp/time)
    // If `time` is "end" we omit the option and let Cloudinary choose the default.
    const hasCustomTime = time !== undefined && time !== null && time !== "end";
    const thumbAction = hasCustomTime
      ? cld().video(publicId).videoThumbnail({ time })
      : cld().video(publicId).videoThumbnail();

    let thumb = thumbAction.format("auto").quality(quality);
    if (width) {
      // keep using the existing transformation helper; this will append a width transform
      thumb = thumb.addTransformation(`w_${width}`);
    }
    return thumb.toURL();
  } catch (e) {
    // If the SDK doesn't support `videoThumbnail()` (some versions), fall back
    // to constructing a direct Cloudinary URL that requests a JPG frame.
    // Example: https://res.cloudinary.com/<cloud>/video/upload/w_100,q_auto:best,f_auto,so_1.5/<publicId>.jpg
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlgi2ockk";

    const transforms = [];
    if (width) transforms.push(`w_${width}`);
    if (quality) transforms.push(`q_${quality}`);
    transforms.push("f_auto");
    if (time !== undefined && time !== null && time !== "end") {
      // if time is numeric or a parsable string, use it as start offset
      transforms.push(`so_${time}`);
    }

    const transformStr = transforms.join(",");
    const fallbackUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformStr}/${publicId}.jpg`;

    if (process.env.NODE_ENV !== "production") {
       
      console.warn(
        "buildVideoThumbnail SDK failed for",
        publicId,
        "; using fallback URL:",
        fallbackUrl,
        "error:",
        e && e.message ? e.message : e
      );
    }

    return fallbackUrl;
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
