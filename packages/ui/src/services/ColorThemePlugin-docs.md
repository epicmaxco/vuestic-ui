# ColorThemePlugin

This plugin provides app-wide colors.

You can define your own colors or change existing ones by providing them via plugin options:

```js
import { setTheme, getTheme } from 'vuestic-ui'

setTheme({primary: '#f06595', blurple: '#7289DA'})
```

And you can use them in component code or template like this:

**Component**
```js
getTheme().primary
```
