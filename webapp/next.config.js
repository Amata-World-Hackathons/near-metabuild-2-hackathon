/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.ASSET_PREFIX || "",
  reactStrictMode: true,
};

module.exports = nextConfig;
