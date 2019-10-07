## Components


# va-badge

```html
<va-badge
 color="warning"
 label="Text in label"
>
 Relative text
</va-badge>
```

or

```html
<va-badge
 color="warning"
>
<tamplate>
    <v-slot:badge>
        <va-icon name="icon brandico brandico-facebook-rect"/>
    </v-slot>
</tamplate>   
 Relative text
</va-badge>
```



### Props
* `color` - String (default: 'success') - use this property to set the color of the badge. We can choose one color from a set of theme colors (primary, secondary, info, error, warning).
* `outline` - Boolean.
* `textColor` - String - use hex, hsl or rgb/rgba.
* `label` - String | Number - any simple content in badge 
* `circle` - Boolean, default true - of visible left and right borders 
* `overlap` - Boolean - the overlap prop will cause the badge to overlap its content.
* `transparent` - String | null 
* `multiline` - Boolean - the multiline prop will cause the multiline content in va-badge
* `visibleEmpty` - Boolean - visibility can be controlled by binding v-model and setting it to true or false programmatically.
* `dot` - Boolean - the prop will cause the badge as a simple point, without text
* `Buttom` - The bottom prop will place the badge as a subscript to the wrapped content. Can be used with left prop to achieve a bottom left position.
* `left` - The left prop will place the badge to the left of the wrapped content. Can be used with bottom prop to achieve a bottom left position.
* `approximateNumber` - the prop will cause value in the badge as an approximate number if a value is a number
           

          
