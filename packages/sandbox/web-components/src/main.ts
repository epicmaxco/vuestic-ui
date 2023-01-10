import { registerVuesticWebComponents, VaButton, VaSelect, VaTab, VaTabs } from 'vuestic-ui/web-components'
import 'vuestic-ui/css'

registerVuesticWebComponents({
  components: {
    VaButton,
    VaSelect,
    // Make sure to register VaTabs before VaTab, otherwise VaTab will be rendered before parent
    // and provide/inject will not work.
    // This is because Parent component provides `parent` for instance of Child component after
    // custom element is connected. If child is connected before parent, then VNode will have no `parent` from Parent
    // This will make `provides` filed empty.
    VaTabs,
    VaTab,
  },

  css: `
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
}
  `
})
