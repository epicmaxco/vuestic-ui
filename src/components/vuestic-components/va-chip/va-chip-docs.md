## Components

* **va-chip**
* **va-badge**
* **va-count-badge**

# va-chip

```html
<va-chip
 icon="brandico brandico-facebook"
 icon-right="iconicstroke iconicstroke-info"
>
 Plus chip
</va-chip>
```  

### Props
* `value` - Boolean - controls chip visibility.
* `outline` - Boolean.
* `color` - String (default: 'success') - use this property to set the color of the chip. We can choose one color from a set of theme colors (primary, secondary, info, error, warning).
* `small` - Boolean
* `large` - Boolean
* `icon` - String - insert icon with defined class from the left side of the chip.
* `iconRight` - String - insert icon with defined class from the right side of the chip

# va-badge

Small chip with possibility to set color.

```html
<va-badge
 outline 
 color="warning"
>
 On Hold
</va-badge>
```

### Props
* `color` - String (default: 'success') - use this property to set the color of the badge. We can choose one color from a set of theme colors (primary, secondary, info, error, warning).
* `outline` - Boolean.

# va-count-badge

Badge for displaying numeric countable information (f.e. in notifications, messages).

```html
<va-count-badge
 :number="999"
 color="info"
>
 Statuses
</va-count-badge>
``` 

### Props
* `number` - Number.
* `color` - String (default: 'success').

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/chips)
