<script lang="ts">
  import { VaCheckbox, VaButton } from 'vuestic-ui'

  const components = {
    checkbox: VaCheckbox,
    button: VaButton
  }
</script>

<script setup lang="ts">
  import { FormKitFrameworkContext } from '@formkit/core';

  import { computed, PropType } from 'vue';


  const props = defineProps({
    bind: {
      type: Object as PropType<FormKitFrameworkContext<any>>,
      required: true
    }
  });

  console.log(props.bind)

  const component = computed(() => {
    return components[props.bind.type as keyof typeof components]
  })
</script>

<template>
  <component
    :is="component"
    v-model="props.bind.value"
  />
</template>
