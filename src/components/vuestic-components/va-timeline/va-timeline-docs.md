## Components

* **va-timeline-item** - timeline item
* **va-timeline** - timeline wrapper

Here's the general example:
```html
<va-timeline vertical centered>
  <va-timeline-item active>
    <template slot="before">
      [date]
    </template>
    <template slot="after">
      [some text]
    </template>
  </va-timeline-item>
</va-timeline>
```

# va-timeline
```html
<va-timeline vertical centered>
  <!-- va-timeline-items here -->
</va-timeline>
```

### Props
* `vertical` - Boolean.
* `centered` - Boolean.
* `alignTop` - Boolean.

# va-timeline-item

```html
<va-timeline-item is-first is-last>
 <div slot="before">22 February, 2018</div>
</va-timeline-item>

<va-timeline-item is-first is-last>
 <va-card
   slot="after"
   stripe="success"
   title-on-image
   overlay
   image="https://picsum.photos/300/200/?random"
 >
   <template slot="title">
     Card with overlay and text on top of image
   </template>
   Running out of pages in your passport. Two trailer park girls go
   around the outside.
 </va-card>
</va-timeline-item>
```

### Props
* `color` - String (default: 'success').
* `vertical` - Boolean.
* `active` - Boolean.
* `activePrevious` - Boolean.
* `activeNext` - Boolean.
* `isFirst` - Boolean.
* `isLast` - Boolean.
* `inverted` - Boolean.

