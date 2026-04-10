import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['next-typegen'],
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/itsacoffeeshop/**',
      },
    ],
  },
};

export default nextConfig;
