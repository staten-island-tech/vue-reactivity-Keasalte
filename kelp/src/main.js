import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

const cards = {
  heart: ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"],
  diamond: ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"],
  club: ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"],
  spade: ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"],
};
