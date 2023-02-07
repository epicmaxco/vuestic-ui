import { registerVuesticWebComponentsEssential, VaConfig, VaCarousel, VaInput } from 'vuestic-ui/web-components'
import 'vuestic-ui/css'

const defaultCSS = `
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}`

registerVuesticWebComponentsEssential({
  css: defaultCSS,

  components: {
    VaConfig, VaCarousel, VaInput,
  }
})
