import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

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

export function buildVideoUrl(publicId) {
  if (!publicId) return null;
  try {
    return cld().video(publicId).format("mp4").toURL();
  } catch {
    return null;
  }
}

// بناء URLs متعددة للفيديو حسب أحجام الشاشات
export function buildResponsiveVideoUrls(publicId) {
  if (!publicId) return null;
  try {
    return {
      mobile: cld()
        .video(publicId)
        .format("mp4")
        .toURL(),
      tablet: cld()
        .video(publicId)
        .format("mp4")
        .toURL(),
      desktop: cld()
        .video(publicId)
        .format("mp4")
        .toURL(),
    };
  } catch {
    return null;
  }
}
