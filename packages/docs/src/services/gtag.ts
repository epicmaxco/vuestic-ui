import { createGtm } from 'vue-gtm'

export const useGtag = (app: any, router: any) => {
  if (process.env.VUE_APP_GTM_ENABLED === 'true') {
    const gtmConfig = {
      id: process.env.VUE_APP_GTM_KEY as string,
      debug: false,
      vueRouter: router,
    }
    app.use(createGtm(gtmConfig))
  }
}
