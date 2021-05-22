module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    semi: "error",
    indent: ["warn", 2, { SwitchCase: 1 }],
    maxLen: [0, 100]
  }
};
