# Summary

Virtual components introduce new way to work with UI library, adding static props which cen be used during compilation step to remove unnecessary code.

# Motivation

The idea of virtual components in removing runtime overhead when using UI library.

Components must be customizable, ideally "component can do anything".

For example, VaSelect component may have a lot of options and have `virtual-scroller` prop. It load `VaVirtualScroll` component even if prop set to `false`.
`VaVirtualScroll` component is `7.32kb`.

```html
<VaVirtualScroller v-if="$props.virtualScroller">
  <VaSelectOption v-for="o in options" :option="o" />
</VaVirtualScroller>
<div v-else>
  <VaSelectOption v-for="o in options" :option="o" />
</div>
```

By removing unused components, composables potentially can be saved a lof of bundle size, parsing time and rendering time almost like no UI library is used.

# Basic example

## Example #1 - Removing runtime v-if

`VaIcon` used in `VaButton` takes `3.5kb` of `15kb` - `20%`.

```html
<VcButton>
  Sign in
</VcButton>
```

renders to:

```html
<button class="va-button">
  Sign In
</button>
```

This avoids unnecessary use of VaIcon and extra v-if.
While if prop is passed, we can add icon to the template.

```html
<VcButton icon="arrow-up">
  Sign In
</VcButton>
```
renders to:

```html
<button class="va-button">
  <VcIcon icon="arrow-up" />
  Sign In
</button>
```

# Drawbacks

The new way of working with components makes it a bit more complicated to develop virtual components:
- Split runtime and compile code when making component template.

# Alternatives

- Provide super small components that can be used to be components from the ground, similar to shadcn. 
- Provide composables and component templates with Tailwind.
