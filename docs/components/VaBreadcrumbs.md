# va-breadcrumbs

```html
<va-breadcrumbs separator="/">
    <va-breadcrumb-item label="application" to="application" />
    <va-breadcrumb-item label="page" to="application/page" />
    <va-breadcrumb-item label="path" to="application/page/path" />
</va-breadcrumbs>
```  

### Props `va-breadcrumbs`
* `align` - String (default: 'left') - use this property to set the color of the button. We can choose one color from a set of theme colors (primary, secondary, info, error, warning)
* `color` - String (default: 'success') - use this property to set the color of the button. We can choose one color from a set of theme colors (primary, secondary, info, error, warning)
* `separator-color` - String (default: use color prop) - separator color (use color theme mixin)
* `active-color` - String (default: use color prop) - colors active items (that means not last one) (use color theme mixin)
* `separator` - default: / - specifies the dividing character between items.

####Slots `va-breadcrumbs`
* `default` - expected: breadcrumbs item
* `separator` - HTML or component you can slot in to separate the breadcrumbs - slot takes priority if prop and slot are both defined



# va-breadcrumb-item
```html
<va-breadcrumb-item label="Text" to="application/page/path"/>
```  

### Props `va-breadcrumbs-item`
* `color` - String (default: 'success') - use this property to set the color of the button. We can choose one color from a set of theme colors (primary, secondary, info, error, warning)
* `disabled` - Boolean
* `label` - String | Number - text content of va-breadcrumb-item 
* `href` - String - native attribute for router-link 
* `to` - String - native attribute for router-link
* `replace` - Boolean - native attribute for router-link 
* `append` - Boolean - native attribute for router-link 
* `exact` - Boolean - native attribute for router-link 


####Slots `va-breadcrumb-item`
* `default` - expected: breadcrumbs-item content
