# Color theme

Given we strike for high customizability for vuestic it's important to introduce graceful fallback for abundance of cases where user is fine with defaults.

* Color theme should not be mandatory for any component. So you should be able to import component to any project - and it should look ok. The most default color is black.
*  If color is set, but not found - there should be a warn, then fallback to black.

## `color` prop
The concept behind color theme is that all relevant components have `color` prop, that signifies main color of component. If other colors should be present - it's implemented as separate props.

* It's required for majority of our components.
* This prop is included as part of mixin.
* Different components handle `color` prop separately.
* We want user to be able to set that one prop - and fully consistently change component looks.

## `dark` prop

* Handled on per-component basis.
* Should be taken from design for each case separately.
* Optional color, such as `text-color` display should adapt to `dark`. I.e. if background is dark - text should be right. If user defines `text-color` - that color is being used instead.

## `gradient` prop

The idea with gradient functionality overall is that it's based on color, i.e. second gradient value is calculated automatically in smart way. We do not keep a way for user to set second value manually right now.

* Obviously, optional prop, should be handled on per component basis.
* Some component modes may not support gradient (i.e. outline button).
