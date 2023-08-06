import { createVuestic, createIconsConfig } from "vuestic-ui";

const aliases = [
  /*...*/
];
const fonts = [
  /*...*/
];

createApp(App)
  .use(createVuestic({
    config: {
      icons: createIconsConfig({ aliases, fonts }),
    },
  }))
  .mount("#app");
