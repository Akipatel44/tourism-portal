/**
 * Next.js config: explicitly enable App Router and prevent Pages Router
 * from picking up existing `src/pages` files by setting `pageExtensions`
 * to a value that does not match the current `.tsx` pages.
 * This lets the `app/` directory be authoritative while keeping `src/pages`
 * as a legacy copy for reference.
 */
module.exports = {
  experimental: {
    appDir: true,
  },
  // Prevent default Pages Router discovery of `.tsx` files in `src/pages`
  pageExtensions: ['page.server.tsx'],
};
