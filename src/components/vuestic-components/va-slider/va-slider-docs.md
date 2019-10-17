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
* `track-label` - String - overwrite value views. Examples: '40px', '33%', etc.
* `track-color` - String - (default: 'success') - use this property to set the color of the track. We can choose one color from a set of theme colors (primary, secondary, info, error, warning) or set hex, rgb
* `track-label-visible` - Boolean - if set to 'true', value label will always be shown. 
* `readonly` - Boolean (default: false) - Sets slider in readonly state
* `min` - Number (default: 0).
* `max` - Number (default: 100).
* `step` - Number (default: 1) - specify amount of steps between the beginning and the end of slider.
* `label` - String - displays label on the left of slider. Should correspond the slider color.
* `invert-label` - Boolean - if set to 'true', label goes right.
* `label-color` - String - (default: 'success') se this property to set the color of label
* `disabled` - Boolean.
* `pins` - Boolean - if set to 'true', display markers on slider track appear.
* `icon-prepend` - String. Insert icon from the left side of the slider. Should follow color theme.
* `icon-append` - String. Insert icon from the right side of the slider. Should follow color theme.
* `vertical` - Boolean (default: false) Changes slider direction to vertical
* `show-track` - Boolean (default: true) set to show/hide track 

### Slots
* `append`  - slot for input after slider
* `prepend` - slot for input before slider
* `label`   - replaces the default label

