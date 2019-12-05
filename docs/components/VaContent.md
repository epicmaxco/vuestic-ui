# va-content
Component applies vuestic specific typography and table styles


## Import
In template: 
```html
<va-content>Slot</va-content>
```

In component:

```js
import { VaContent } from `vuestic-ui`

export default {
  components: {
    VaContent,
  }
}
```

## Usage
```html
<va-content>
 <h1>H1</h1>
 <h3>H2</h2>
 ...
 <pre>Text</pre>
 <blockquote>Text</blockquote>
</va-content>
```

### Props
The component does not have props

### Slots
* `default` - Any vue components or html tags


