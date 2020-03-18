# va-sidebar

```html
<va-sidebar :hidden="isOpen">
  <template slot="menu"> ... </template>
</va-sidebar>
```

### Props
* `minimized` - Boolean.
* `color` - String (default: 'secondary').

### Slots
* `menu` - set of sidebar links.

There are two types of components, that can be inserted in 'menu' slot:
Sidebar is composed of 2 components:
* **`sidebar-link`** - wrapper on router link, with 'title' slot for title and icon.
* **`sidebar-link-group`** - wrapper with 'title' slot for title and icon and default slot for sidebar links. Used in cases, when sidebar links can be grouped in category.

