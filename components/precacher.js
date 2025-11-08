"use client"; 

import { prebuiltassets } from "@/constants/assest";
import { useAssetPrecacher } from "@/hooks/useAssetPrecacher";

export default function Precacher() {
  useAssetPrecacher(prebuiltassets);
  return null;
}

