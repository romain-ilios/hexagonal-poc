/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hexanext/core'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
      '@/model': '../core',
    };
    return config;
  },
};

module.exports = nextConfig; 