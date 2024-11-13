<script lang="ts">
import { useInput } from '@formkit/vue'
import { defineComponent, ref } from 'vue';
import Child from './Child.vue'

export default defineComponent({
  components: {
    Child
  },
  setup(props, ctx) {
    const node = useInput({
      type: 'text',
      label: 'Test',
      helpText: 'This is a test',
      validation: 'required|min:3',
      validationVisibility: 'live'
    } ,ctx);

    const value = ref(false)

    console.log(node)

    return {
      value
    }
  }
})

</script>

<template>
  <FormKit
    type="button"
    label="Test"
  />
  <FormKit
    #wrapper="bind"
    type="checkbox"
    label="Test"
    validation="required|min:3"
    v-model="value"
  >
    <Child :bind="bind" />
  </FormKit>
</template>

