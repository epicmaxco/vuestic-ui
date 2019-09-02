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
* `split` - Boolean
* `split-href` - String - (works only with split) 
* `disabled` - Boolean
* `button-disabled` - Boolean - (works only with split) Disable the main button
* `dropdown-disabled` - Boolean - (works only with split) Disable the arrow
* `position` - String - One of the 'top', 'bottom', 'left', 'right', 'auto', 'top-start', 'top-end' (and same for each direction). See [popper.js docs](https://popper.js.org/popper-documentation.html#Popper.placements) for details.

### Slots
* `default` - dropdown content area
* `label` - button content area

### Events
* `@click` - Emitted on any button click
* `@mainButtonClick` - Emitted on main button click. Works only with split.

