/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(path.resolve(__dirname));

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};
