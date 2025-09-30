"use client"; 

import { SITE_ASSIST } from "@/constants/assest";
import { useAssetPrecacher } from "@/hooks/useAssetPrecacher";

export default function Precacher() {
  useAssetPrecacher(SITE_ASSIST);

  return null;
}