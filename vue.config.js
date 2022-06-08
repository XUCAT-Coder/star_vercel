const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://star-api-sand.vercel.app",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === "production") {
      config.plugin("compressionPlugin").use(
        new CompressionWebpackPlugin({
          // filename: "[path][base].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
  },
};
