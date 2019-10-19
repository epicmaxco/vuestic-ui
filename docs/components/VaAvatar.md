# Avatar

[[toc]]

The `va-avatar` is normally used for profile picture or user lists. You can use letter or icon instead of image if it's not available.

## Examples

### Mix

<AvatarMixSnippet/>

<<< @/docs/.vuepress/components/AvatarMixSnippet.vue

[use the following cases to snippet]
* color + text-color
* color + icon
* color + size + font-size
* src
* color + icon + square

### Sizes

!Gotcha: `size` defines avatar container size, when `font-size` is used for internal text. So, in most cases, if you want to change component size - you need to change both `size` and `font-size`.

<<< @/docs/.vuepress/components/AvatarSizeSnippet.vue

<AvatarSizeSnippet/>

# props

* `color` - String - hex color string
* `textColor` - String - hex color string
* `fontSize` - String (default - 60% from size) - font size in pixels
* `square` - Boolean (default: false) - border radius disabled
* `icon` - String - icon name should be passed
* `src` - String - path to image
* `size` - String|Number - small|medium|large as string value or value in px e.g. '20px' or 20

# Usage

## image avatars
* image will fit vertically

```html
  <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar>
  <va-avatar>
    <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="woman">
  </va-avatar>
```

## square avatars

* square property passed to remove border radius
```html
<va-avatar square src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar>
```

## Icon avatars
```html
<va-avatar size="small" icon="iconicstroke iconicstroke-info"></va-avatar>

<va-avatar>
  <va-icon name="iconicstroke iconicstroke-info"></va-icon>
</va-avatar>
```
## Avatars coloring
* background color for avatar (blue by default)

```html
<va-avatar color="coral"></va-avatar>

<va-avatar color="#00FF00"></va-avatar>

<va-avatar color="rgb(135,206,250)"></va-avatar>
```

* text coloring
```html
<va-avatar textColor="danger" color="#fafafa">A</va-avatar>

<va-avatar textColor="#00FF00" color="#fafafa">B</va-avatar>

<va-avatar textColor="rgb(135,206,250)" color="#fafafa">C</va-avatar>
```
