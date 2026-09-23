import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/paillettes-et-paves",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
