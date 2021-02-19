import { DebounceLoader } from 'asva-executors'

export function registerVuesticObject (Vue: any) {
  const $va = Vue.prototype.$va = new Vue({
    data () {
      return {}
    },
  })

  const resizeDebounceLoader = new DebounceLoader(
    async resizeEvent => {
      $va.$pub('resizeEnd', resizeEvent)
    },
    150,
  )

  window.addEventListener('resize', resizeEvent => {
    $va.$pub('resize', resizeEvent)
    resizeDebounceLoader.run(resizeEvent)
  })
}
