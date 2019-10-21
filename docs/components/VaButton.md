# va-button

```html
<va-button
 outline
 color="success"
 icon="brandico brandico-facebook"
>
 Button 1
</va-button>

<va-button
 flat large
 color="info"
 icon="brandico brandico-facebook"
 icon-right="iconicstroke iconicstroke-info"
>
 Button 2
</va-button>

<va-button
 small color="warning"
 icon-right="iconicstroke iconicstroke-info"
 href="http://epic-spinners.epicmax.co/"
>
 Button 3
</va-button>

<va-button outline small icon="ion-md-close ion"/>
```  

### Props
* `tag` - String (default: 'button') - use this property to set the tag of element, which behaviour is more suitable for your button.
* `outline` - Boolean - use `:outline="true"` to set outline type of button
* `flat` - Boolean - use `:flat="true"` to set flat type of button 
* `color` - String (default: 'success') - use this property to set the color of the button. We can choose one color from a set of theme colors (primary, secondary, info, error, warning)
* `small` - Boolean - use `:small="true"` to set small size of modal
* `large` - Boolean - use `:large="true"` to set large size of modal 
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
