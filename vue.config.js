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
      .entry('app')
      .clear();
    config
      .entry('startup')
      .add('./src/startup/main.js')
      .end()
    config
      .entry('main')
      .add('./src/main/main.js')
      .end()

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
