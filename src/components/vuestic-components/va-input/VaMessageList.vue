<template>
  <div
    v-if="messages.length"
    class="va-message-list"
    :style="computedStyle"
  >
    <div
      class="va-message-list__message"
      v-for="(message, index) in messages"
      :key="index"
    >
      {{message}}
    </div>
  </div>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'va-message-list',
  mixins: [ColorThemeMixin, ContextPluginMixin],
  data () {
    return {
      colorThemeDefault: 'gray', // mixin override
    }
  },
  props: {
    value: {
      type: [String, Number, Object, Array],
      default () {
        return getContextPropValue(this, 'value', '')
      },
    },
    limit: {
      type: Number,
      default () {
        return getContextPropValue(this, 'limit', 1)
      },
    },
  },
  computed: {
    messages () {
      if (!this.value) {
        return []
      }
      if (!Array.isArray(this.value)) {
        return [this.value]
      }
      return this.value.slice(0, this.limit)
    },
    computedStyle () {
      return {
        color: this.colorComputed,
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-message-list {
  &__message {
    vertical-align: middle;
    font-size: $font-size-mini;
  }
}
</style>
