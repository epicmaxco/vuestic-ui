export const colorsConfig = `
// main.js
...
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)
app.use(VuesticPlugin, {
  colors: {
    // {{ $t('configurationGuide.colors.defaultColors') }}
    primary: '#23e066',
    secondary: '#002c85',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#e34b4a',
    warning: '#ffc200',
    gray: '#babfc2',
    dark: '#34495e',

    // {{ $t('configurationGuide.colors.customColors') }}
    yourCustomColor: '#d0f55d',
  },
})
`;
