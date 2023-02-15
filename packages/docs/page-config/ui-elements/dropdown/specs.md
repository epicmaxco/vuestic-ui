### Map

![Example how to get `content.left`](https://user-images.githubusercontent.com/23530004/181629414-5e40211a-7a3c-4d3c-8e78-8808b956d98b.png)
_Example how to get `content.left`_

### Blocks

- browser window - edge from where `getBoundingClientRect` returns `.left`
- viewport - container with overflow hidden. Content shouldn't be visible outside the viewport. Used in auto-placement, if overflows viewport - flip placement.
- root - a container relative to which content will be positioned. We need to set content `.left` which is relative to `root.left`.
- anchor - content must be directly near anchor, but then offset can be added.
- content - block which we need to position.

### Placement

All placement names the same as in CSS.

- verical - cross direction `left`, main:
  - `bottom`
  - `auto` the same as `bottom` (activates `auto-placement`)
  - `top`
- horizontal - cross direction `bottom`, main:
  - `left`
  - `right`

Sub placement

`*-start`
`*-center` - (default), for example `bottom-center` can be just `bottom`, `left-center` - just `left`.
`*-end`

### Terms

- offset - contains main and cross line. For:

  - `'top' | 'bottom'` the main line is `vertical` outside of anchor. Cross will be `horizontal` to the BOTTOM.
  - `'left' | 'right'` the main line is `horizontal` outside of anchor. Cross will be `vertical` to the LEFT.

- auto-placement - makes content always visible if viewport big enough.
- stick-to-edges - makes content stick to edge if auto-placement is off and moves content outside of viewport.

### Behavior

If `preventOverflow` is false, then `root` the same as `anchor`. So we position `content` relative to `anchor`. `anchor` must have `position: relative` css. `viewport` stay the same, cuz we need it for `auto-placement` feature.

If `preventOverflow` is true, we teleport content to be a `root` child. This way `root` is `viewport`'s first relative parent.
