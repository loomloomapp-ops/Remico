/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export — produces ./out for shared (PHP/HTML) hosting on Hostinger.
  output: "export",
  // Each route becomes /route/index.html — Apache serves it directly without rewrites.
  trailingSlash: true,
  images: {
    // Required for static export — no Next.js image optimizer at runtime.
    unoptimized: true,
  },
};

export default nextConfig;
