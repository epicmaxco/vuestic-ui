const app = createApp(App)
  .use(
    createVuestic({
      config: {
        colors: {
          variables: {
            primary: "#B456C0",
            custom: "#A35600",
          },
        },
      },
    })
  )
  .mount("#app");
