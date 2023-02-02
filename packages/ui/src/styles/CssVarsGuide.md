# Vuestic UI css variables usage

## General information

Vuestic UI comes with a lot of css variables that allow you to deeply customize
the styles of UI components.

Css variables name convention:

Schema: `--[component-name]-[state*]-[nested-element*]-[size*]-[property]`

* `component-name` - component name started with va- prefix. va-button/va-badge
* `state` - state of elements or its preset. outline/square/flat/primary/secondary
* `nested-element` - some element that can be nested in root component. content/wrapper
* `size` - size of target element. sm/lg
* `property` - common css property. color/transition/border-radius

`*` - is unnecessary part needed only for specific cases.

## Usage

1. Create css/scss file in your project (e.g. vuestic-overrides.scss) with the following template:

```css
:root, :host {

}
```

This is the place where you need to put all your overrides.

2. Import created file to your main.js file directly after imported vuestic-ui styles.

```js
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
import './vuestic-overrides.css'
```

3. Start playing with overrides.
