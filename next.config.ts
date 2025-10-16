import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, ".next"),
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
