const withLess = require('@zeit/next-less');
const withImages = require('next-images');

const theme = require('./src/styles/theme.js');

const themeVariables = {
  '@primary-color': theme.colors.primary,
  '@link-color': theme.colors.detail,
  '@heading-color': theme.colors.secondary,
  '@text-color': theme.colors.secondaryLight,
  '@text-color-secondary': theme.colors.secondaryLighter,

  '@success-color': theme.colors.green,
  '@warning-color': theme.colors.yellow,
  '@error-color': theme.colors.red,
  '@info-color': theme.colors.detail,
  '@loading-color': theme.colors.detail,

  '@disabled-color': theme.colors.secondaryLightest,

  '@font-size-base': theme.general.fontSize.small,
  '@border-radius-base': theme.general.borderRadius,
  '@border-color-base': theme.colors.primaryDarker,
  '@box-shadow-base': theme.general.boxShadowBase,
};

module.exports = withImages(
  withLess({
    // Next <Image />
    images: {
      domains: ['images.unsplash.com'],
    },

    // next-images library
    esModule: true,

    // antd library
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const originalExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof originalExternals[0] === 'function') {
              originalExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof originalExternals[0] === 'function'
            ? []
            : originalExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
      return config;
    },
  }),
);
