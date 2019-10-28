<template>
  <div class="example">
    <va-badge left>
      <template v-slot:badge>
        NEW
      </template>
      LEFT
    </va-badge>
    &nbsp;
    &nbsp;
    &nbsp;
    <va-badge>
      <template v-slot:badge>
        NEW
      </template>
      DEFAULT
    </va-badge>
  </div>
</template>

<script>
import VaBadge from '../../../src/components/vuestic-components/va-badge/VaBadge'

export default {
  components: {
    VaBadge,
  },
}
</script>
