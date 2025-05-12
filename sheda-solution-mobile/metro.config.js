const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

module.exports = async () => {
  const config = await getDefaultConfig(__dirname);

  // SVG support
  config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg"
  );
  config.resolver.sourceExts.push("svg");

  // Apply reanimatedMetroConfiq and NativeWind
  return wrapWithReanimatedMetroConfig(
    withNativeWind(config, { input: "./global.css" })
  );
};
