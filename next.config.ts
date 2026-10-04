import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {

  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk",
      },
    ],
  },
};

export default nextConfig;
