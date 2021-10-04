<template>
  <va-badge :text="params.value" :color="params.value" />
</template>

<script>
import VaBadge from 'vuestic-ui/src/components/va-badge/VaBadge'

export default {
  components: { VaBadge },
}
</script>
