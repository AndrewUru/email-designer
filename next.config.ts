import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mjml", "uglify-js"],
};

export default nextConfig;
