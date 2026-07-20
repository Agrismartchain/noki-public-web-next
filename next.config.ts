import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
