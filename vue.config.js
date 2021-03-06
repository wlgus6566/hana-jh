const path = require("path");
module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
                    @import "@/assets/scss/_variables.scss";
                    @import "@/assets/scss/_mixins.scss";
        `,
      },
    },
  },
  devServer: {
    port: 8080,
    overlay: false,
    disableHostCheck: true,
    // host: 'localhost',
    proxy: {
      "/b2b/api": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },
    },
  },
};
