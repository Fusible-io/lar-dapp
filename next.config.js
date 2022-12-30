/** @type {import('next').NextConfig} */
const nextConfig = {

  // "https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu"
  // (https://fusible.mypinata.cloud/ipfs/QmPomjVi6p8jofgiQSqyZRgDvGDkwAzBJDtexEb83SFPHm/USA.png)

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
      }
    ],
  },

  reactStrictMode: false,

  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },

}

module.exports = nextConfig
