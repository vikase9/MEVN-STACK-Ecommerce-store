const webpackOptions = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
    			@import "~@e9ine/vue_components/src/scss/_variables.scss";
    			`,
      },
    },
  },
  pages: {
    login: {
      entry: "./src/login/login.js",
      template: "public/login.html",
      filename: "login.html",
    },
    admin: {
      entry: "./src/webapp/admin/main.js",
      template: "public/admin/index.html",
      filename: "admin/index.html",
    },
  },
  lintOnSave: true,
};

module.exports = webpackOptions;
