# va-icon

## Import
```html
  <va-icon name="close"/>

  <va-icon
    name="face"
    color="info"
    rotation="45"
    size="60"
  />
```

###Props
* name - `String, Array` - The name of icon set and icon (will be used as class). We support Material design icons. 
* size - `String, Number` - Sets the custom size of icon in pixels
* fixed-width - `Boolean` - If `fixed-width` prop is `true`, width of the icon will be 1.25rem
* rotation - `String, Number` - Sets the degree of icons rotation.
* color - `String` - Sets the color of icon
* tag - `String` - (default: `i`) - icon tag


###Slots 
* `default` - expected: material-icons value only

