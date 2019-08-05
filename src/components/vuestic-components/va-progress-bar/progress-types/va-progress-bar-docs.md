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

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/statistics/progress-bars)
