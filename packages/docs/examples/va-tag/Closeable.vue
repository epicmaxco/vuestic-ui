<template>
  <div>
    <va-tag
      v-model="value"
      closeable
    >
      closeable tag
    </va-tag>
    <va-checkbox v-model="value" label="reset value" />
  </div>
</template>

<script>
import VaCheckbox from '../../../ui/src/components/vuestic-components/va-checkbox/VaCheckbox'
export default {
  components: {
    VaCheckbox,
  },
  data () {
    return {
      value: true,
    }
  },
}
</script>
