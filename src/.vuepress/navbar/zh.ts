import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "大数据组件", icon: "discover", link: "/home.md" },
  { text: "项目管理", icon: "creative", link: "/manage.md" },
  { text: "开源项目", icon: "creative", link: "/project.md" },
  // {
  //   text: "指南",
  //   icon: "creative",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "creative",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "more", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "config",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "more", link: "" }],
  //     },
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "note",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
