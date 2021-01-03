// $ npm i -D @ginpei/eslintrc
// $ npm i -D @typescript-eslint/eslint-plugin eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier prettier

module.exports = {
  extends: "./node_modules/@ginpei/eslintrc/.eslintrc.js",
  globals: {
    globalThis: "readonly",
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "import/extensions": ["error", "always"],
  },
};
