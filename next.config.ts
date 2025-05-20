import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['l4it.net','logos-world.net'], 
  },
   eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
