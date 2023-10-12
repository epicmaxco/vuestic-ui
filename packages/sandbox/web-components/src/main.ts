import { registerVuesticWebComponents } from 'vuestic-ui/web-components'
import 'vuestic-ui/css'
import demos from './demos'

const demosEl = document.querySelector('.demos')

demos.forEach((demo) => {
  demosEl.appendChild(demo)
})

registerVuesticWebComponents({})
