/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  siteUrl: 'https://barbarpotato.github.io/Projects/',
  generateSitemap: true,
  output: 'export',
  basePath: '/Projects', // The repository name
  assetPrefix: '/Projects', // The repository name
}

export default nextConfig