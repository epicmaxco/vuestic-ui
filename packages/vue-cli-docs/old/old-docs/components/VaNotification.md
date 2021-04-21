`va-notification` component is meant to catch user attention in order to convey important information.

```html
<va-notification 
  v-model="isVisible" 
  color="info" 
  closeable
>
 <va-badge color="success" label="Paid" />
 You successfully read this important alert message.
</va-notification>
```  

### Props
* `color` - String (default: 'success') - use this property to set the color of the notification. We can choose one color from a set of theme colors (primary, secondary, info, error, warning)
* `value` - Boolean - use `:value="true"` to set visibility of the notification
* `closeable` - Boolean - use `:closeable="true"` to add close icon on the right side of notification. Both with value get possibility to hide notification

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/notifications)
