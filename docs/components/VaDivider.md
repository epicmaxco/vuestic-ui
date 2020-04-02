# va-divider

```html
<div>Item 1</div>
<va-divide>default (center)</va-divide>
<div>Item 2</div>
<va-divider orientation="left">left text</va-divider>
<div>Item 3</div>
<va-divider dashed />
<div>Item 4</div>
<va-divider inset />


<div style="display: flex; height: 40px;">
  <div>Item 1</div>v
  <va-divider vertical />
  <div>Item 1</div>
  <va-divider vertical />
  <div>Item 1</div>
  <va-divider vertical inset />
</div>
``` 

### Props
* `vertical: Boolean` - displays divider vertically
* `dashed (*): Boolean` - whether line is dashed
* `inset (*): Boolean` - if set to true, the left and right margins will be added; reduces height for vertical divider
* `orientation: String` - ['left', 'right', 'center'] - position of title inside divider (for horizontal only)

### Slots
* `default` - insert content (for horizontal only)
