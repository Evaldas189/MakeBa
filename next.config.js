module.exports = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [
      "e7.pngegg.com",
      "fakestoreapi.com",
      "images-na.ssl-images-amazon.com",
      "logodix.com",
      "cdn.buyee.jp",
      "encrypted-tbn0.gstatic.com",
      "st2.depositphotos.com",
      "mydigitech.in",
      "canary.contestimg.wish.com",
      "m.media-amazon.com",
    ],
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
