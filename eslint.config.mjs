import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";
import compat from "eslint-plugin-compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...prettier,
  {
    globalIgnores: [
      ...globalIgnores,
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/**",
      "node_modules/**",
      "eslint.config.mjs",
      "postcss.config.js",
    ],
    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      "compat": compat,
    },
    extends: [
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:compat/recommended",
    ],
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    rules: {
      // استخدام simple-import-sort فقط لتجنب التضارب
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // إلغاء import/order لتجنب التضارب
      "import/order": "off",
      // Disallow hard-coded Cloudinary CDN strings; use the helper functions in lib/cloudinary instead
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Literal[value=/^https?:\\/\\/res\\.cloudinary\\.com\\/.*$/]",
          message:
            "Avoid hard-coded Cloudinary URLs; use buildImageUrl / buildVideoThumbnail from lib/cloudinary instead.",
        },
      ],
    },
  },
]);

export default eslintConfig;
