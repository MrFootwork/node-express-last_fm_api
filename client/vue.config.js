const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
