/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

function createPath() {
  const packageName = isDev ? 'effector-logger' : 'effector';
  return path.resolve(__dirname, `node_modules/${packageName}`);
}

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },

  chainWebpack: (config) => {
    const effector = createPath();

    config.resolve.alias.set('effector-logger', effector);
    config.plugins.delete('prefetch');
  },

  pwa: {
    name: 'SavePaws',
    themeColor: '#ffc40d',
    appleMobileWebAppStatusBarStyle: '#ffc40d',
    msTileColor: '#ffc40d',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
    },
  },
};
