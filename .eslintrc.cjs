require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  plugins: ["no-relative-import-paths", "jsx-a11y"],
  extends: ["@rushstack/eslint-config/profile/web-app"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: false,
          object: false
        }
      }
    ]
  },
  env: { browser: true, es2020: true },
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname
  },
  ignorePatterns: [
    "dist",
    "jsfy",
    "build",
    "public",
    ".eslintrc.cjs",
    "vite.config.ts",
    "babel.config.json"
  ]
};
