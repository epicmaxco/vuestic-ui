# Runtime code

## Summary

Compiled components in result may want to have state, event listeners and other runtime code.

### Example

```html
virtual-components/VcDropdown.vue

<script setup>
  const doShow = ref(false);

  const toggle = () => {
    doShow.value = !doShow.value;
  };
</script>

<template>
  <div class="vc-dropdown">
    <button @click="toggle">Toggle</button>
    <div v-if="doShow" class="vc-dropdown-content">
      <slot />
    </div>
  </div>
</template>
```

```html
virtual-components/VcSelect.vue

<template>
  <VcDropdown :runtime>
    <template #default>
      <slot />
    </template>
  </VcDropdown>
</template>
```