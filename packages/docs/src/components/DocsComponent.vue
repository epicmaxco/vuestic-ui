<template>
  <div class="mb-3">
    <component :is="component" />
  </div>
</template>

<script>
import { ref, computed, shallowRef } from 'vue'
import { readDocsComponent } from '@/utilities/utils'

export default {
  name: 'DocsComponent',
  props: {
    value: {
      type: [Object, String],
      default: undefined,
    },
    path: {
      type: String,
      default: undefined,
    },
  },
  setup (props) {
    const file = computed(() => {
      if (props.value === Object(props.value)) {
        return props.value.file
      }

      return props.value
    })
    const path = ref(props.path)
    const component = shallowRef(null)

    importComponent()

    async function importComponent () {
      component.value = (await readDocsComponent(path.value, file.value)).default
    }

    return {
      component,
      file,
    }
  },
}
</script>
