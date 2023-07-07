// main.js
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

createApp(App)
  .use(
    createVuestic({
      config: {
        colors: {
          variables: {
            // Default colors
            primary: "#23e066",
            secondary: "#002c85",
            success: "#40e583",
            info: "#2c82e0",
            danger: "#e34b4a",
            warning: "#ffc200",
            gray: "#babfc2",
            dark: "#34495e",

            // Custom colors
            yourCustomColor: "#d0f55d",
          },
        },
      },
    })
  )
  .mount("#app");
