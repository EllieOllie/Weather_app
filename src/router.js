import { createRouter, createWebHistory } from "vue-router";
import WeatherToday from "./views/WeatherToday";
const routes = [
  {
    path: "/",
    name: "WeatherToday",
    component: WeatherToday,
  },
  {
    path: "/photos",
    name: "Photo",
    component: () => import("./views/Photos.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
