import { createRouter, createWebHistory } from "vue-router";

import Form1 from "../pages/Form1.vue";
import Form2 from "../pages/Form2.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/form1" },
    { path: "/form1", name: "form1", component: Form1 },
    { path: "/form2", name: "form2", component: Form2 },
  ],
});

export default router;

