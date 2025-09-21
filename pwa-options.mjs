/** @type {import('next-pwa').PWAConfig} */
export const pwaOptions = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
};
