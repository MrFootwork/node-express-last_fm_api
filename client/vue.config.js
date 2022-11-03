const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    proxy: {
      "^/search": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
