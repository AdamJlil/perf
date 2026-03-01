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
      // Local-only setup, API is mocked
      apiBase: "http://localhost:3000",
    },
  },

  modules: ["@unocss/nuxt", "@nuxt/image", "@pinia/nuxt"],
  plugins: ["~/plugins/swiper.client.js", "~/plugins/mock-api.ts"],

  build: {
    transpile: ["swiper", "chart.js", "vue-chartjs"],
  },

  nitro: {
    // Fix for circular dependency issues
    imports: {
      presets: [
        {
          from: "h3",
          imports: ["eventHandler", "setResponseStatus"],
        },
      ],
    },
  },

  app: {
    head: {
      title: 'PERF',
      titleTemplate: '',
      bodyAttrs: {
        class: 'min-w-[430px] bg-slate-950 antialiased text-white'
      },
      link: [
        {
          rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
        },
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
          name: "Content-Security-Policy",
          content: "default-src 'self' http://localhost:3001 http://host.docker.internal:3001 http://127.0.0.1:3001; script-src 'self' 'unsafe-inline' 'unsafe-eval' chrome-extension:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:;",
        },
      ],
    },
  },

  compatibilityDate: "2025-04-10",
});