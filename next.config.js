/** @type {import('next').NextConfig} */
const nextConfig = {

  // "https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu"
  // (https://fusible.mypinata.cloud/ipfs/QmPomjVi6p8jofgiQSqyZRgDvGDkwAzBJDtexEb83SFPHm/USA.png)
  // https://goerli-integration-api.nftfi.com/loans/v2/promissory/image/5/18240033257052016565
  // valhalla-nft-production.s3.amazonaws.com

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'fusible.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'goerli-integration-api.nftfi.com',
        port: '',
        pathname: '/loans/v2/promissory/image/**',
      },
      {
        protocol: 'https',
        hostname: 'valhalla-nft-production.s3.amazonaws.com',
        pathname: '/**',
      }
    ],
  },

  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,

  },

  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },

}

module.exports = nextConfig
