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
    //强制使用分号
    "semi": "error",
    //缩进
    "indent": ["warn", 2, { SwitchCase: 1 }],
    "max-len": [0, 80]
  }
};
