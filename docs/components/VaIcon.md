```html
  <va-icon :name="close"/>

  <va-icon
    :name="face"
    color="info"
    rotation="45"
    size="60"
  />
```

***Props***
* `name` - String, Array - The name of icon set and icon (will be used as class). We support Material design icons. 
* `size` - String (default: 'medium') - use this property to set items size in rating. You can use preset values (`"medium"`, `"large"`, `"small"`) or define exact size: `"30px"`.
* `fixedWidth` - Boolean - If `fixedWidth` prop is `true`, width of the icon will be 1.25rem
* `rotation` - String, Number - Sets the degree of icons rotation.
* `color` - String - Sets the color of icon

