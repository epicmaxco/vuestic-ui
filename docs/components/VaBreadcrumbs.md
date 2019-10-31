# Breadcrumbs

`va-breadcrumbs` используется на странице для навигации по приложению. Показывает место текущей страницы в иерархии навигации. Используется вместе с компонентами `va-breadcrumbs-item`

## Examples

### Default

<VaBreadcrumbsDefaultSnippet/>

<<< @/docs/.vuepress/components/VaBreadcrumbsDefaultSnippet.vue


### Color

Устанавливает цвет всех элементов, кроме неактивного (последнего).

<VaBreadcrumbsColorSnippet/>

<<< @/docs/.vuepress/components/VaBreadcrumbsColorSnippet.vue


### Separator

Устанавливает пользовательский разделитель.

<VaBreadcrumbsSeparatorSnippet/>

<<< @/docs/.vuepress/components/VaBreadcrumbsSeparatorSnippet.vue


### Align

Позиционирует компонент `va-breadcrumbs` по горизонтали.

<VaBreadcrumbsAlignSnippet/>

<<< @/docs/.vuepress/components/VaBreadcrumbsAlignSnippet.vue


### Vue-router parameters

Компонент `va-breadcrumbs` совместим с библиотекой `vue-router` и поддерживает параметры: `href`, `to`, `replace`, `append`, `exact`.  Применяется на компоненты `va-breadcrumbs-item`.

<VaBreadcrumbsRouterSnippet/>

<<< @/docs/.vuepress/components/VaBreadcrumbsRouterSnippet.vue


## API `va-breadcrumbs` 

[API is work in progress, for now just textual info]

Component `va-breadcrumbs`:

* `color` - String - цвет темы или hex цвет,
* `separator-color` - String - цвет темы или hex цвет разделителя,
* `active-color` - String - цвет темы или hex цвет доступных ссылок,
* `align` - String - значение выравнивания. В качестве значений принимаются строки: ('left', 'center', 'between', etc),
* `separator` - String - элемент разделителя.

Slots:

* `default` - Один или несколько элементов `va-breadcrumbs-item`,
* `separator` - Элемент разделителя. Может быть строкой или vue компонентом.  Слот имеет больший приоретет, чем параметр `separator`.


## API `va-breadcrumbs-item`

[API is work in progress, for now just textual info]

* `disabled` - Boolean - делает компонент неактивным,
* `label` - String | Number - содержимое компонента,
* `href` - String - router-link attribute, 
* `to` - String - router-link attribute,
* `replace` - Boolean - router-link attribute, 
* `append` - Boolean - router-link attribute,
* `exact` - Boolean - router-link attribute.

Slots: 

* `default` - содержимое компонента. Слот имеет больший приоретет, чем `label`.
