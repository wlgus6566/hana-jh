import { pages } from "@/utils/path";

export default [
  {
    path: "/insurance",
    component: pages("insurance"),
    children: [
      {
        path: "",
        component: pages("insurance/list"),
        meta: { title: "보험사 목록" },
      },
    ],
  },
];
