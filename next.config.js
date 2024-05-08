/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(wav)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/sounds/",
            outputPath: "static/sounds/",
            name: "[name].[ext]",
            esModule: false
          }
        }
      ]
    });
    return config;
  }
};

module.exports = nextConfig;
