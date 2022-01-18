import Vue from "vue";
import VueRouter from "vue-router";
import { pages } from "@/utils/path";

import qna from "./modules/qna";
import insurance from "@/router/modules/insurance";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      component: pages("main"),
      meta: { title: "main" },
    },
    ...qna,
    ...insurance,
  ],
});

export default router;
