"use client";

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

export function buildImageUrl(publicId) {
  if (!publicId) return null;
  try {
    const source = cld().image(publicId);

    if(videoThumbnail){
        return video(publicId).videoThumbnail().toURL();
    }

    return source.format("auto").quality("auto").toURL();
  } catch {
    return null;
  }
}

export function buildVideoUrl(publicId) {
  if (!publicId) return null;
  try {
    return cld()
      .video(publicId)
      .toURL();
  } catch {
    return null;
  }
}

