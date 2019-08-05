## Components

Color pickers are composed of 7 components:
* **va-color-picker-input**
* **va-simple-palette-picker**
* **va-color-input**
* **va-advanced-color-picker**
* **va-slider-color-picker**
* **va-color-square**
* **color-dot**

Let's break them apart:

# va-color-picker-input

```html
  <va-color-picker-input v-model="value" mode="palette" :palette="palette">
    <color-dot :color="value"/>
  </va-color-picker-input>
```

This component provides 3 modes:
* Advanced
* Palette
* Slider

`va-color-input` component passed default through the slot with palette mode. 
When colors are provided - input is disabled.
Slots are allowed to switch `color-input` for something else, for example `color-square`.
Picker is shown in dropdown.

### Props
* `value` - String - Color string
* `mode` - String - Picker mode
* `palette` - Array
* `selected` - Boolean

# va-simple-palette-picker

```html
  <va-simple-palette-picker
    v-model="value"
    :palette="palette"
  />
```
Colors are passed through array. For each color in array component creates `color-dot` component

### Props
* `value` - String - Color string
* `palette` - Array - Palette of colors

# va-color-input

```html
  <va-color-input v-model="value"/>
```
Consists of of input and `va-color-dot`.
Input could be disabled.
```html
  <va-color-input v-model="value" disabled/>
```
Dot could be selected.
```html
  <va-color-input v-model="value" selected/>
```

### Props
* `value` - String - Color string
* `selected` - Boolean - selected/unselected dot
* `disabled` - Boolean - enabled/disabled input

# va-advanced-color-picker

```html
  <va-advanced-color-picker v-model="value"/>
```

### Props
* `value` - String - Color string

# va-slider-color-picker

```html
  <va-slider-color-picker v-model="value"/>
```

### Props
* `value` - String - Color string

# va-color-square

```html
  <va-color-square :value="value"/>
```

### Props
* `value` - String - Color string

# color-dot

```html
<color-dot
 color="#value"
 :selected="selected"
/>
```

### Props
* `value` - String - Color string
* `selected` - Boolean - selected/unselected dot

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/color-pickers)
