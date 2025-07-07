# Script setup

## Summary 

Methods and variables declared in virtual component script setup body are available in template.

## Methods

Methods can be used to simplify virtual component template

### With static prop

When static prop is used as method argument, method will be called during compilation and insert its value for further optimization

```html
virtual-component/VcButton

<script setup>
  defineProps({
    color: String
  })

  const defaultButtonStyle = ''

  const getColor = (colorName) => {
    if (colorName === 'primary') {
      return '#00f'
    }
    if (colorName === 'secondary') {
      return '#00a'
    }
  }
</script>

<template>
  <button :class="`bg-[${getColor($props.color)}]`">
    <slot />
  </button>
</template>
```

```html
App.vue

<template>
  <VcButton color="primary">Test</VcButton>
</template>
```

```html
output

<template>
  <button class="bg-[#00f]">
    <slot />
  </button>
</template>
```

### With dynamic prop

While using method with dynamic prop, method will be called in runtime 

```html
virtual-component/VcButton

<script setup>
  defineProps({
    color: String
  })

  const defaultButtonStyle = ''

  const getColor = (colorName) => {
    if (colorName === 'primary') {
      return '#00f'
    }
    if (colorName === 'secondary') {
      return '#00a'
    }
  }
</script>

<template>
  <button :class="`bg-[${getColor($props.color)}]`">
    <slot />
  </button>
</template>
```

```html
App.vue

<template>
  <VcButton color="primary">Test</VcButton>
</template>
```

```html
output
<script>
import { getColor } from 'virtual-components:VcButton'
</script>

<template>
  <button :class="`bg-[${getColor($props.color)}]`">
    <slot />
  </button>
</template>
```

### Component imports

Component imports are not available in script setup and will be replaced with 
