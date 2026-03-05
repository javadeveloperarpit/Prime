/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // Ye saare domains allow kar dega
    ],
  },
};
export default nextConfig;