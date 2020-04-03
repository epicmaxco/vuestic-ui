## Components

* **va-progress-bar**
* **va-progress-circle**

# va-progress-bar

```html
<va-progress-bar 
 :value="35" 
 color="warning"
/>
```  

### Props
* `value` - Number.
* `indeterminate` - Boolean - if 'indeterminate' is 'true', 'value' prop will be ignored.
* `color` - String  (default: `success`).
* `buffer` - Number (default: 100).
* `reverse` - Boolean - reverse progress bar direction
* `rounded` - Boolean - (default: true) make the bar rounded
* `size` - Number|String - height of the bar in pixels or in css units (rem|em|ex|pt|pc|mm|cm|px). Also use one these values `['small', 'medium', 'large']`

# va-progress-circle

```html
<va-progress-circle 
 indeterminate 
 color="info"
/>
```

### Props
* `value` - Number.
* `indeterminate` - Boolean.
* `color` - String  (default: `success`).
* `size` - String|Number (default: 40) - bar size (diameter) in pixels or size in css units (rem|em|ex|pt|pc|mm|cm|px)
* `thickness` - Number (default: 0.06) - circle border size between 0 and 1

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/statistics/progress-bars)
