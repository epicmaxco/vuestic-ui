# Avatar

The `va-avatar` is normally used for profile picture or user lists. You can use letter or icon instead of image if it's not available.

## Examples

### Mix

<VaAvatarMixSnippet/>

<<< @/docs/.vuepress/components/VaAvatarMixSnippet.vue

### Sizes

!Gotcha: `size` defines avatar container size, when `font-size` is used for internal text. So, in most cases, if you want to change component size - you need to change both `size` and `font-size`.

<VaAvatarSizeSnippet/>

<<< @/docs/.vuepress/components/VaAvatarSizeSnippet.vue


### Color

Устанавливает значение цвета компонента. Можно использовать цвета темы (`primary`, `warning`), или css цвета (`aqua`, `#ad0`).

<VaAvatarColorSnippet/>

<<< @/docs/.vuepress/components/VaAvatarColorSnippet.vue


### Square

Change the presentation type of component.

<VaAvatarSquareSnippet/>

<<< @/docs/.vuepress/components/VaAvatarSquareSnippet.vue

## API

[API is work in progress, for now just textual info]

* `color` - String - theme color or hex color for background
* `textColor` - String - theme color or hex color for text
* `fontSize` - String (default - 60% from size) - font size in pixels
* `square` - Boolean (default: false) - border radius disabled
* `icon` - String - icon name should be passed
* `src` - String - path to image
* `size` - String|Number - small|medium|large as string value or value in px e.g. '20px' or 20
