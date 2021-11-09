<template>
  <va-button
    class="mr-2 mb-2"
    @click="$vaToast.init('Hello')"
  >
    Basic notification
  </va-button>

  <va-button
    class="mr-2 mb-2"
    @click="$vaToast.init({ message: getMessage })"
  >
    Message from function
  </va-button>

  <va-button
    class="mb-2"
    @click="$vaToast.init({ render: getComponent })"
  >
    HTML code inside
  </va-button>
</template>

<script>
import { defineComponent } from 'vue'
import ExampleComponent from './ExampleComponent.vue'

export default defineComponent({
  setup () {
    return {
      getMessage: () => 'Message from function',
      getComponent: (h) => h(ExampleComponent),
    }
  },
})
</script>
