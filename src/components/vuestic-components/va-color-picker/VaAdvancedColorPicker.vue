<template>
  <ChromePicker
    v-model="valueProxy"
    class="va-advanced-color-picker"
  />
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'VaAdvancedColorPicker',
  components: {
    ChromePicker: Chrome,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    valueProxy: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value.hex)
      },
    },
  },
}
</script>

<style lang="scss">
.va-advanced-color-picker {
  .vc-chrome-alpha-wrap {
    display: none;
  }

  .vc-chrome-hue-wrap {
    margin-top: 10px;
  }

  .vc-chrome-toggle-btn {
    display: none;
  }
}
</style>
