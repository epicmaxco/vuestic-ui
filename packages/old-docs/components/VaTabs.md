## Components

* **va-tab**
* **va-tabs**

Here's the general example:
```html
  <va-tabs v-model="value">
    <va-tab name="name1" icon="fas-home" label="Tab with icon"/>
    <va-tab name="name2">
      <span>Tab with custom content</span>
    </va-tab>
  </va-tabs>
```
# va-tabs

### Props
* `value` - String, Number - Model value for component
* `left` - Boolean - Shifts tabs to left side (by default)
* `right` - Boolean - Shifts tabs to right side
* `center` - Boolean - Centers the tabs
* `grow` - Boolean - Forces tabs to take all width
* `disabled` - Boolean - Disables all tabs
* `hideSlider` - Boolean - Hides slider
<!-- * `vertical` - Boolean - Stacks tabs vertically -->
* `color` - String - Specifies color via `ColorThemeMixin`
* `stateful` - Boolean - For stateful tabs selecting tab will change tabs internal value even if `:value` didn't change.
* `prev-icon` - String - Left icon in pagination
* `next-icon` - String - Right icon in pagination

### Slots 
* `default` - Slot for tabs content

### Events
* `input` - Event occurring when active tab changes

# va-tab

### Props
* `icon` - String - Adds icon before tab label
* `label` - String - Tab label (text content)
* `name` - String - Used as key for tab. If none specified order in dom of `default` slot is used as a key.
* `disabled` - Boolean - Disables the tab

### Slots 
* `default` - Default slot for tab content. If empty contains `{icon} {label}`.

### Events 
* `click` - Emitted when tab is clicked
* `keydown` - Emitted when tab enter key is pressed on focused tab