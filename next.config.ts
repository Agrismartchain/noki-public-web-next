import type { NextConfig } from "next";

import { buildSecurityHeaders } from "./src/lib/security/headers";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: buildSecurityHeaders({ imgSrc: ["https:"], indexable: true }) }];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fr",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/fr/contact",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/fr/register",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/fr/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
