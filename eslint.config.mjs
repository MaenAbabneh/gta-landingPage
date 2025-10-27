import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = defineConfig( [
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
    },
    rules: {
      // استخدام simple-import-sort فقط لتجنب التضارب
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // إلغاء import/order لتجنب التضارب
      "import/order": "off",
    },
  },
]);

export default eslintConfig;
