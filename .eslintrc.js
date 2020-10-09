module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    quotes: "off",
    "@typescript-eslint/quotes": ["error", "double"],
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    jest: true,
    browser: true,
  },
};
