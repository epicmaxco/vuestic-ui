# Script setup

## Summary 

Methods and variables declared in virtual component script setup body are available in template.

## Methods

### Example

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