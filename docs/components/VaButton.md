# va-button

```html
<va-button
 outline
 color="success"
 icon="android"
>
 Button 1
</va-button>

<va-button
 flat 
 size="large"
 color="info"
 icon-right="android"
>
 Button 2
</va-button>

<va-button
 size="small"
 color="warning"
 icon-right="iconicstroke iconicstroke-info"
 href="http://epic-spinners.epicmax.co/"
>
 Button 3
</va-button>

<va-button outline size="small" icon="close"/>
```  

### Props
* `tag` - String (default: 'button') - use this property to set the tag of element, which behaviour is more suitable for your button.
* `outline` - Boolean - use `:outline="true"` to set outline type of button
* `flat` - Boolean - use `:flat="true"` to set flat type of button 
* `color` - String (default: 'success') - use this property to set the color of the button. We can choose one color from a set of theme colors (primary, secondary, info, error, warning)
* `size` - String (default: 'medium') - use `size="small"` to set the size of modal. Use one of these values `['small', 'medium', 'large']`
* `icon` - String
* `iconRight` - String
* `type` - String - native attribute for button
* `disabled` - Boolean
* `href` - String - native attribute for a-link button
* `target` - String - native attribute for a-link button
* `to` - String - native attribute for router-link
* `replace` - Boolean - native attribute for router-link button
* `append` - Boolean - native attribute for router-link button
* `to` - String | Object - native attribute for router-link button
* `exact` - Boolean - native attribute for router-link button
* `exactActiveClass` - String - native attribute for router-link button

### References
* Router-link: https://router.vuejs.org/api/

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/buttons)
