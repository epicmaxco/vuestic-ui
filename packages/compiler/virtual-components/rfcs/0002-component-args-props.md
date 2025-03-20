# Component arguments

## Overview

Component may have multiple arguments that changes how component must be rendered. Arguments are declared in user's code.
This regulates how users code must be parsed and used in virtual component as arguments.
Virtual components use arguments during rendering SFC.

## Parsing Arguments

When virtual component is used in user's code, compiler context must be created.
Compiler context includes user provided arguments: props, listeners, directives, slots.

## Compile Arguments

### Props

Similar to Vue SFC virtual component may accept props. This props can be used in virtual component in conditional rendering.

#### Example

```html
App.vue

<template>
  <VcIcon name="person" />
</template>
```

compiles to

```html
<template>
  <i class="fa fa-person" />
</template>
```

### Static and dynamic props

Static prop:
```html
App.vue

<vc-button icon="person">Sign In</vc-button>
```

Dynamic prop:
```html
App.vue

<vc-select :options="roles" />
```

Static props are used in compiler context as simple key-value props. It can be used in conditional virtual component rendering.

Dynamic props are impossible to use during compilation, because only key is available. Value is dynamic and not available during compilation.

### Props execution

#### Execution expression

Execution expressions are expressions in virtual component that can be calculated (or optimized) in compile time.

```html
virtual-components/VcFullName.vue

<script setup>
  defineProps({
    firstName: String,
    lastName: String,
  })
</script>

<template>
  <div>{{ firstName + ' ' + lastName }}</div>
</template>
```

or

```html
virtual-component/VcIcon.vue
<script setup>
  defineProps({
    font: String,
    name: String,
  })
</script>

<template>
  <i :class="`${font} ${font}-${name}`" />
</template>
```

Expression can have condition inside

```html
virtual-component/VcFullName.vue

<template>
  <div>{{ lastName ? firstName + ' ' + lastName : firstName }}</div>
</template>
```
#### Static expression optimization

If component uses only static props in expression, it must be calculated in compile time.

```html
App.vue

<template>
  <VcIcon font="fa" name="person" />
</template>
```

```html
virtual-component/VcIcon.vue

<template>
  <i :class="`${font} ${font}-${name}`" />
</template>
```

```html
output

<template>
  <i class="fa fa-person" />
</template>
```

#### Dynamic expression rendering

In case if dynamic expression is used, no compile optimization is expected:


```html
App.vue

<script setup>
  const user = { icon: 'person' }
</script>

<template>
  <VcIcon font="fa" :name="user.icon" />
</template>
```

```html
virtual-component/VcIcon.vue

<template>
  <i :class="`${font} ${font}-${name}`" />
</template>
```

```html
output

<template>
  <i :class="`fa fa-${user.icon}" />
</template>
```

## Props declaration in virtual component
By default virtual component supports only `script setup` (Composition API code style for script).

Props must be declared with `defineProps`. If passed prop is not declared, it will be considered as attribute and will be added to component root. Attributes are not available during compilation time.

Props can be declared with Object and Generic style.

```js
defineProps({
  myProp1: Number,
  myProp2: { type: Number }
})
```

```ts
defineProps<{
  myProp1: number
}>()
```

! Notice that Array props declaration is not support and not planned in virtual component syntax.

### Props defaults

Instead of using withDefaults, you need to use props destructure.

```ts
const { myProp1 = 'user' } = defineProps<{ myProp1: string }>()
```

> Notice: `withDefaults` will be ignored in virtual component syntax

You can also use object declaration 

```ts
const props = defineProps({ myProp1: { default: 'user' }})
```

> Attention: You can not use variable to assign to default value

```ts
// This is prohibited

const color = 'red'
const { 
  myProp1 = color
  myProp2 = color
} = defineProps<{ myProp1: string, myProp2: string }>()
```