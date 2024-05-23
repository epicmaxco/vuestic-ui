import { createApp } from "vue";
import { createVuesticEssential } from "vuestic-ui";
import "vuestic-ui/css";
import App from "./App.vue";

createApp(App)
  .use(
    createVuesticEssential({
      config: {
        /* ... */
      },
    })
  )
  .mount("#app");
