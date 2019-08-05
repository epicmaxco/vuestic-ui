```html
<va-card
 overlay
 titleOnImage
 image="https://picsum.photos/300/200/?image=1043"
 title="Card with title on image"
>
 The unique stripes of zebras make them one of the animals most familiar to people.
</va-card>
```

### Props
* `image` - String - image url
* `imageAlt` - String - text, that placed in image area, when image is loading or can't be loaded
* `stripe` - String - color of line above the title image
* `title` - String
* `titleOnImage` - Boolean - moves text on top of image.
* `overlay` - Boolean - shows darkish overlay on top of your image. Works only with `title-on-image`. Needed for [light images](https://i.imgur.com/V8mNM98.png) to keep text readable.
* `color` - String - color of card background
* `noPaddingV` - Boolean
* `noPaddingH` - Boolean
* `noPadding` - Boolean

### Slots
* `title` - card title
* `default` - card body 

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/cards)

