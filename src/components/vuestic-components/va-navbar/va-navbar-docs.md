# va-navbar

```html
<va-navbar>
    <header-selector slot="selector" :isOpen.sync="valueProxy"/>
    <span slot="logo"> ... </span>
    <span slot="center"> ... </span>
    <slot></slot>
</va-navbar>
```

**Slots**
* `selector` - icon, that toggles sidebar state
* `logo` - app logo
* `center` - info about app (f.e, contacts) 
* `default` - components, that placed in right part of navbar (f.e, user settings dropdowns)
