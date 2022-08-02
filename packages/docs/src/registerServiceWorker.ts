import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  const reloadOnControllerChange = () => {
    (window as any).page_reload_notification()
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }

  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log('App is being served from cache.')
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        reloadOnControllerChange,
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available, please refresh.')
      navigator.serviceWorker.addEventListener(
        'controllerchange',
        reloadOnControllerChange,
      )
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    },
  })
}
