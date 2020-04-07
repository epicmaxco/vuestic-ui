# va-button-dropdown


### Props
* `color` - String.
* `button-props` - Object
    * `small` - Boolean.
    * `large` - Boolean.
    * `flat` - Boolean.
    * `outline` - Boolean.
* `label` - String
* `icon` - String
* `opened-icon` - String - Custom icon instead of arrow up. If `icon` is provided, and `opened` is not provided, `icon` will be used as both.
* `split` - Boolean
* `split-to` - String - (works only with split) Main button will be used as `router-link`
* `disabled` - Boolean
* `disable-button` - Boolean - (works only with split) Disable the main button
* `disable-dropdown` - Boolean - (works only with split) Disable the arrow
* `position` - String - One of the 'top', 'bottom', 'left', 'right', 'auto', 'top-start', 'top-end' (and same for each direction). See [popper.js docs](https://popper.js.org/popper-documentation.html#Popper.placements) for details.

### Slots
* `default` - dropdown content area
* `label` - button content area

### Events
* `@click` - Emitted on any button click
* `@mainButtonClick` - Emitted on main button click. Works only with split.

