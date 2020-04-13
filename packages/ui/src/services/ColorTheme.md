# ColorTheme mixin

## `color` prop
The concept behind color theme is that all relevant components have `color` prop, that signifies main color of component. If other colors should be present - it's implemented as separate props.

* There should be no case, when, let's say `text-color` prop exist, but `color` doesn't.
* Different components handle `color` prop separately.
* We want user to be able to set that one prop - and fully consistently change component looks.

## `dark` prop
