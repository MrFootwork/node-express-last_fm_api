const { defineConfig } = require('@vue/cli-service');

// FIXME get reading env from node server working
// use environment variables for api-keys
const path = require('path');

const pathEnvironment = path.join(__dirname, '../api/config/.env');
require('dotenv').config({ path: pathEnvironment });

const port = process.env.PORT || 4000;

module.exports = defineConfig({
  // FIXME try different output location for production build
  //  outputDir: path.resolve(__dirname, "../public"),
  devServer: {
    // TODO why doesn't this work?
    // workaround: package.json: "vue-cli-service serve --port 3000"
    port: 3000,
    proxy: {
      '^/search': {
        // FIXME after moving location of production build,
        // try new target using process.env.PORT
        // and add BASE_URL
        // goal: use server side .env in vue app
        target: `http://localhost:${port}`,
        changeOrigin: true,
      },
    },
  },
  // TODO try to change meta for page title
  // https://stackoverflow.com/questions/72095078/in-vue3-vue-meta-showing-name-meta-for-each-meta-tags-so-not-able-to-add-twit
  pwa: {
    name: 'Artist Search to CSV',
  },
});
