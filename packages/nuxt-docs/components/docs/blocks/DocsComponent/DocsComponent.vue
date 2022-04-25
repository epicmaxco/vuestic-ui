<template>
  <div v-if="!isLoaded">
    Loading...
  </div>
  <div
    v-else
    class="mb-3"
  >
    <component :is="component" />
  </div>
</template>

<script>
export default defineComponent({
  name: 'DocsComponent',
  props: {
    component: { type: String, default: undefined },
    path: { type: String, default: undefined },
  },
  setup: (props) => {
    const { component, isLoaded } = useComponentReader(
      `${props.path}/components`,
      props.component
    )

    return { component, isLoaded }
  }
})
</script>
