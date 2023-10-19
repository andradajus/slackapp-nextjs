/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


module.exports = {
  webpack5: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.(jpe?g|png|svg|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // Disable preloading for images larger than 8KB
          },
        },
      });

      return webpackConfig;
    },
  },
};

