// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxt/ui",
  ],
  googleFonts: {
    families: {
      Barlow: true,
      Inter: true,
      "DM Sans": true,
    },
  },
  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.API_ENDPOINT,
    },
  },
})
