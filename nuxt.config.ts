// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  // routeRules: {
  //   '/api/**': { proxy: { to: 'https://kostbuddy.netlify.app/api/**' }, cors: true }
  // },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: {
    redirect: false
  },
  nitro: {
    preset: 'netlify',
    routeRules: {
      '/api/**': {
        cors: true,
      },
    },
  },
})