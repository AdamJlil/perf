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
      // Dynamic base URL for local or production
      apiBase: process.env.BASE_URL || "http://localhost:3000",
    },
  },

  modules: ["@unocss/nuxt", "@nuxt/image", "@pinia/nuxt"],
  plugins: ["~/plugins/swiper.client.js"],

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
          // Real CSP (the previous `name=` variant was ignored by browsers).
          // frame-src allows any https embed so admins can register videos from
          // Google Drive, YouTube, Vimeo, etc.
          "http-equiv": "Content-Security-Policy",
          content:
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; frame-src 'self' https:; connect-src 'self' https: ws: wss:; media-src 'self' blob: https:; object-src 'none'; base-uri 'self';",
        },
      ],
    },
  },

  compatibilityDate: "2025-04-10",
});