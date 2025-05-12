const { default: plugin } = require("tailwindcss");

module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        '@babel/plugin-transform-export-namespace-from',
        'react-native-reanimated/plugin', //as to be the last plugin
      ],
    };
  };