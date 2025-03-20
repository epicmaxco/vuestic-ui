# Nested virtual components

## Summary

One virtual component may contain another virtual component

```html
virtual-components/VcButton.vue

<script setup>
  defineProps({
    icon: String,
    iconRight: String
  })
</script>

<template>
  <button>
    <VcIcon v-if="icon" :name="icon" />
    <slot />
    <VcIcon v-if="iconRight" :name="iconRight" />
  </button>
</template>
```

```html
virtual-components/VcIcon.vue

<script setup>
  defineProps({ name: String })
</script>

<template>
  <i class="material-icons">{{ name }}</i>
</template>
```