module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    'react-native-paper/babel',
    ['@babel/plugin-transform-private-methods', {loose: true}],
  ],
};
