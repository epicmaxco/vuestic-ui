```html
<va-slider
 value-visible
 v-model="value"
 :label-value="`${value3}px`"
 :min="1000"
 :max="2000"
/>

<va-slider
 range
 pins
 :step="10"
 v-model="value2"
/>
```  

```javascript
export default {
  data () {
    return {
      value: 90,
      value2: [20, 60]
    }
  },
}
``` 

### Props
* `range` - Boolean - if set to 'true', slider becomes range.
* `value` - Number | Array.
* `label-value` - String - overwrite value views. Examples: '40px', '33%', etc.
* `value-visible` - Boolean - if set to 'true', value label will always be shown. 
* `min` - Number (default: 0).
* `max` - Number (default: 100).
* `step` - Number (default: 1) - specify amount of steps between the beginning and the end of slider.
* `label` - String - displays label on the left of slider. Should correspond the slider color.
* `inverse-label` - Boolean - if set to 'true', label goes right.
* `disabled` - Boolean.
* `pins` - Boolean - if set to 'true', display markers on slider track appear.
* `icon` - String. Insert icon from the left side of the slider. Should follow color theme.
* `icon-right` - String. Insert icon from the right side of the slider. Should follow color theme.

