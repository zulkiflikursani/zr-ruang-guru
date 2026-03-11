import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  basePath: __dirname,
});

// Gunakan array standar [] untuk menghindari bug circular JSON
const eslintConfig = [
  // 1. Ambil aturan Next.js secara hati-hati
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Tambahkan aturan kustom Anda
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-var": "off",
      "no-console": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },

  // 3. Abaikan folder yang tidak perlu di-lint
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
