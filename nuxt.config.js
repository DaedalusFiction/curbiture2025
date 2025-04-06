import { siteName, siteURL, siteDescription } from "./data";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-jsonld",
    "@nuxtjs/sitemap",
  ],
  site: {
    url: "https://" + siteURL,
    name: siteName,
  },

  sitemap: {
    // exclude all URLs that start with /secret
    exclude: ["/admin/**"],
    // include all URLs that start with /public
    include: ["/", "/about", "/index", "/search"],
  },

  runtimeConfig: {},

  app: {
    head: {
      title: siteName,
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/favicon-16x16.png",
        },
        { rel: "manifest", href: "/favicons/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/favicons/safari-pinned-tab.svg",
          color: "#5bbad5",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },

      meta: [
        { name: "msapplication-TileColor", content: "#da532c" },
        { name: "theme-color", content: "#ffffff" },
        {
          name: "description",
          content: siteDescription,
        },
      ],
    },
  },

  components: {
    dirs: ["~/components", "~/components/icons"],
  },

  compatibilityDate: "2024-10-31",
});
