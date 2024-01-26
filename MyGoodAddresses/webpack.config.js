const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Personnaliser la configuration de Webpack ici
  config.resolve.alias['react-native$'] = 'react-native-web';

  // Support pour les fichiers .tsx
  config.module.rules.push({
    test: /\.tsx?$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  });

  return config;
};
