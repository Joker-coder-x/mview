module.exports = {
  chainWebpack: config => {
    config.module
      .rule("image")
      .test(/\.ico$/)
      .use("url-loader")
      .loader("url-loader");
  },
  configureWebpack: config => {
    config.entry.app = "./examples/main.js";
  }
};
