const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: 'system',
      filename: 'js/[name].js',
    },
    externals: ['@cgi/styleguide', 'vue', 'vue-single-spa']
  },
})
