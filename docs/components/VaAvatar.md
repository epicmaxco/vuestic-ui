# Avatar

[[toc]]

The `va-avatar` is normally used for profile picture or user lists. You can use letter or icon instead of image if it's not available.

## Examples

### Mix

<AvatarMixSnippet/>

<<< @/docs/.vuepress/components/AvatarMixSnippet.vue

### Sizes

!Gotcha: `size` defines avatar container size, when `font-size` is used for internal text. So, in most cases, if you want to change component size - you need to change both `size` and `font-size`.

<AvatarSizeSnippet/>

<<< @/docs/.vuepress/components/AvatarSizeSnippet.vue


## API

[API is work in progress, for now just textual info]

* `color` - String - hex color string
* `textColor` - String - hex color string
* `fontSize` - String (default - 60% from size) - font size in pixels
* `square` - Boolean (default: false) - border radius disabled
* `icon` - String - icon name should be passed
* `src` - String - path to image
* `size` - String|Number - small|medium|large as string value or value in px e.g. '20px' or 20
