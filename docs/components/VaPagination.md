# va-pagination

This component is used to separate data, what helps user to receive information easier. Integrated in tables and lists.

```html
<va-pagination
 size="small"
 :pages="10" 
 color="success"
 v-model="activePage"
/>

<va-pagination
 :pages="10" 
 :visible-pages="3"
 :boundary-links="false"
 v-model="activePage"
/>
``` 

```javascript
export default {
  data () {
    return {
      activePage: 2
    }
  }
}
``` 

### Props
* `value` - Number - value of active button in pagination component. 
* `visiblePages` - Number (default: 5) - amount of buttons (instead of navigation buttons) that are shown in the component at one moment.
* `pages` - Number - amount of all pages. If it is not specified, it is equal to length value.
* `disabled` - Boolean.
* `size` - String (default: 'medium') - use `size="small"` to set the size of modal. Use one of these values `['small', 'medium', 'large']`
* `color` - String (default: 'info').
* `boundaryLinks` - Boolean - shows boundary ('>>', '<<') icons.
* `directionLinks` - Boolean - shows direction ('>', '<') icons.
* `icon` - Object (default: { direction: 'fa fa-angle-left', boundary: 'fa fa-angle-double-left' }) - change left icons. Values of object properties are icon classes.
* `iconRight` - Object (default: { direction: 'fa fa-angle-right', boundary: 'fa fa-angle-double-right' }) - change right icons. Values of object properties are icon classes.

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/buttons)
