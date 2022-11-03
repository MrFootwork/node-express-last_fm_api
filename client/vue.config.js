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
  // TODO try to change meta for page title
  // https://stackoverflow.com/questions/72095078/in-vue3-vue-meta-showing-name-meta-for-each-meta-tags-so-not-able-to-add-twit
  pwa: {
    name: "Artist Search to CSV",
  },
});
