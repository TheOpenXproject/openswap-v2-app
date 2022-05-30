var path = require('path')


module.exports = {
    configureWebpack: config => {
       return
    },
    chainWebpack: config => {
      config.plugins.delete('hmr');
      if (process.env.NODE_ENV === 'production') {
        config.module.rule('vue').uses.delete('cache-loader');
        config.module.rule('js').uses.delete('cache-loader');
        config.module.rule('ts').uses.delete('cache-loader');
        config.module.rule('tsx').uses.delete('cache-loader');
      }
    },
    devServer: {
      hot: false
    }
  };