import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...nextVitals,
  prettier,
  ...compat.extends(
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:compat/recommended"
  ),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./jsconfig.json",
        },
      },
    },
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/**",
      "node_modules/**",
      "eslint.config.mjs",
      "postcss.config.js",
    ],
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/order": "off",
      "import/no-named-as-default": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Literal[value^='https://res.cloudinary.com/'], Literal[value^='http://res.cloudinary.com/']",
          message:
            "Avoid hard-coded Cloudinary URLs; use buildImageUrl / buildVideoThumbnail from lib/cloudinary instead.",
        },
      ],
    },
  },
];

export default eslintConfig;
