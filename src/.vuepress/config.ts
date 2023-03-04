import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Docs Demo",
      description: "A docs demo for vuepress-theme-hope",
    },
    "/": {
      lang: "zh-CN",
      title: "Witty Big Data",
      description: "Witty Big Data大数据工程师面试指南",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
