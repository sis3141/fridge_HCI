const {
  override,
  addBabelPlugins,
  addExternalBabelPlugins,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackModuleRule,
  removeModuleScopePlugin,
  babelInclude,
} = require('customize-cra');
const path = require('path');
const {DefinePlugin} = require('webpack');

module.exports = {
  paths: (paths, env) => {
    paths.appBuild = path.resolve(__dirname, 'build');
    paths.appPublic = path.resolve(__dirname, 'app/web');
    paths.appHtml = path.resolve(__dirname, 'app/web/index.html');
    paths.appIndexJs = path.resolve(__dirname, 'index.web.js');
    return paths;
  },
  webpack: override(
    addWebpackModuleRule({test: /(\.ts$|\.tsx$)/, use: 'babel-loader'}),
    ...addBabelPlugins('babel-plugin-react-native-web'),
    ...addExternalBabelPlugins(
      'react-native-web',
      [
        // Enable new JSX Transform from React
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
      ['@babel/plugin-proposal-decorators', {legacy: true}],
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      ['@babel/plugin-proposal-private-methods', {loose: true}],
      ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
    ),
    addWebpackAlias({
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      'lottie-react-native': 'react-native-web-lottie',
      '@_api': path.resolve(__dirname, '_api'),
      '@_constants': path.resolve(__dirname, '_constants'),
      '@_functions': path.resolve(__dirname, '_functions'),
      '@_utils': path.resolve(__dirname, '_utils'),
      '@styles': path.resolve(__dirname, 'app/components/styles'),
      '@utils': path.resolve(__dirname, 'app/utils'),
      '@images': path.resolve(__dirname, 'app/assets/images'),
      '@lotties': path.resolve(__dirname, 'app/assets/lotties'),
      '@animations': path.resolve(__dirname, 'app/assets/animations'),
      '@hooks': path.resolve(__dirname, 'app/hooks'),
      '@constants': path.resolve(__dirname, 'app/constants'),
      '@icons': path.resolve(__dirname, 'app/assets/icons'),
      '@functions': path.resolve(__dirname, 'app/functions'),
      '@platformPackage': path.resolve(
        __dirname,
        'app/components/platformPackage',
      ),
      '@packages': path.resolve(__dirname, 'app/packages'),
      '@atoms': path.resolve(__dirname, 'app/components/atoms'),
      '@displays': path.resolve(__dirname, 'app/components/displays'),
      '@molecules': path.resolve(__dirname, 'app/components/molecules'),
      '@actors': path.resolve(__dirname, 'app/components/molecules/actors'),
      '@presenters': path.resolve(
        __dirname,
        'app/components/molecules/presenters',
      ),
      '@decorations': path.resolve(
        __dirname,
        'app/components/molecules/decorations',
      ),
      '@organisms': path.resolve(__dirname, 'app/components/organisms'),
      '@templates': path.resolve(__dirname, 'app/components/templates'),
      '@pages': path.resolve(__dirname, 'app/components/pages'),
      '@routes': path.resolve(__dirname, 'app/navigation/routes'),
      '@navigators': path.resolve(__dirname, 'app/navigation/navigators'),
      '@navigationConfigs': path.resolve(__dirname, 'app/navigation/configs'),
    }),
    addWebpackPlugin(
      new DefinePlugin({
        // `process.env.NODE_ENV === 'production'` must be `true` for production
        // builds to eliminate development checks and reduce build size. You may
        // wish to include additional optimizations.
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development',
        ),
        __DEV__: process.env.NODE_ENV !== 'production',
      }),
    ),
  ),
};
