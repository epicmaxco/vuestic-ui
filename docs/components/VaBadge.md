# Badge

The `va-badge` component superscripts or subscripts an avatar-like icon or text onto content to highlight information to a user or to just draw attention to a specific element. Content within the `va-badge` usually contains text, numbers or icons. Может использоваться как самомтоятельный элемент, или в связке сдругим элементами

## Examples

### Mix

<VaBadgeMixSnippet/>

<<< @/docs/.vuepress/components/VaBadgeMixSnippet.vue


### Color

Устанавливает цвет компонента.

<VaBadgeColorSnippet/>

<<< @/docs/.vuepress/components/VaBadgeColorSnippet.vue


### Left

 Атрибут располагает `va-badge` слева от компонента. Допустимо использовать вместе с атрибутом `bottom`.


<VaBadgeLeftSnippet/>

<<< @/docs/.vuepress/components/VaBadgeLeftSnippet.vue


### Bottom

Атрибут располагает `va-badge` снизу компонента. Допустимо использовать вместе с атрибутом `left`.

<VaBadgeBottomSnippet/>

<<< @/docs/.vuepress/components/VaBadgeBottomSnippet.vue


### Overlap

Позволяет смещать `label` компонента `va-badge` ближе к его содержимому.

<VaBadgeOverlapSnippet/>

<<< @/docs/.vuepress/components/VaBadgeOverlapSnippet.vue


### Dot

Позволяет отображать компонент `va-badge` в виде точки.


<VaBadgeDotSnippet/>

<<< @/docs/.vuepress/components/VaBadgeDotSnippet.vue


### Transparent

Устанавливает полупрозрачность компоненту `va-badge`.

<VaBadgeTransparentSnippet/>

<<< @/docs/.vuepress/components/VaBadgeTransparentSnippet.vue




## API

[API is work in progress, for now just textual info]

* `color` - String - theme color or hex color for background
* `textColor` - String - theme color or hex color for label text
* `label` - String | Number - simple content in badge 
* `overlap` - Boolean - will cause the badge to overlap its content
* `transparent` - Boolean - add 50% transparent
* `multi-line` - Boolean - will cause the multiline content
* `visible-empty` - Boolean - visibility empty badge
* `dot` - Boolean - cause the badge as a simple point, without text
* `bottom` - Boolean - vertical alignment of badge
* `left` -  Boolean - horizontal alignment of badge
