const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      outputDir: 'dist'
    }
  },
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].excludeChunks = ['app','startup']
      return args
    })
    config
      .plugin('html-startup')
      .use(HtmlWebpackPlugin, [{  // Also generate a test.html
        filename: 'startup.html',
        title: 'Welcome to Camp Manager',
        template: 'public/startup.html',
        inject: true,
        excludeChunks: ['app','main']
      }])
  }
}
