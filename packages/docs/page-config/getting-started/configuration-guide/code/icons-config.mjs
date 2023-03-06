// main.js
import { createVuestic, createIconsConfig } from "vuestic-ui";
import "vuestic-ui/css";

createApp(App)
  .use(
    createVuestic({
      config: {
        icons: createIconsConfig({
          aliases: [
            {
              name: "bell",
              color: "#FFD43A",
              to: "fa4-bell",
            },
            {
              name: "ru",
              to: "flag-icon-ru small",
            },
          ],
          fonts: [
            {
              name: "fa4-{iconName}",
              resolve: ({ iconName }) => ({ class: `fa fa-${iconName}` }),
            },
            {
              name: "flag-icon-{countryCode} {flagSize}",
              resolve: ({ countryCode, flagSize }) => ({
                class: `flag-icon flag-icon-${countryCode} flag-icon-${flagSize}`,
              }),
            },
          ],
        }),
        // ...
      },
    })
  )
  .mount("#app");
