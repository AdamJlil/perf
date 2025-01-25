// nuxt.config.ts

const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = ONE_DAY * 7;

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    cookieName: "__session",
    cookieSecret: "secret",
    cookieExpires: ONE_DAY.toString(),
    cookieRememberMeExpires: ONE_WEEK.toString(),
    public: {
      apiBase: 'http://localhost:3001'
    }
  },
  modules: ["@unocss/nuxt", "@nuxt/image"],
  plugins: ['~/plugins/swiper.client.js'],
  build: {
    transpile: ['swiper'],
  },
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:3001/api/**'
      }
    }
  },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
      meta: [
        {
          name: 'Content-Security-Policy',
          content: "default-src 'self' http://localhost:3001; script-src 'self' 'unsafe-inline' 'unsafe-eval' chrome-extension:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:;"
        }
      ]
    },
  },
});
