<template>
  <div class="mb-3">
    <va-content>
      <DocsCode
        v-if="component"
        :code="component"
        language="scss"
      />
    </va-content>
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
        console.log(file)
        component.value = file.default
      }
    }

    return {
      component,
    }
  },
})
</script>
