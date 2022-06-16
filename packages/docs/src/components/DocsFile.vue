<template>
  <div class="mb-3">
    <DocsCode
      v-if="component"
      :code="component"
      language="scss"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import DocsCode from './DocsCode.vue'

export default defineComponent({
  name: 'DocsFile',
  components: { DocsCode },
  props: {
    file: {
      type: Object as PropType<Promise<Record<string, any>>>,
    },
  },
  setup (props) {
    const component = ref('')

    importComponent()

    async function importComponent () {
      const file = (await props.file)
      if (file) {
        component.value = file.default
      }
    }

    return {
      component,
    }
  },
})
</script>
