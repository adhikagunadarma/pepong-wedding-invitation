const repoName = 'wedding-template';
const isGithubPages = process.env.DEPLOY_TARGET === 'gh-pages';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // <-- important for routing & static HTML
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
};


export default nextConfig;
