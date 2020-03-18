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
      {{ message }}
    </div>
  </div>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const MessageListContextMixin = makeContextablePropsMixin({
  value: {
    type: [String, Number, Object, Array],
    default: '',
  },
  limit: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: 'gray',
  },
})

export default {
  name: 'VaMessageList',
  mixins: [ColorThemeMixin, MessageListContextMixin],
  data () {
    return {
      colorThemeDefault: 'gray', // mixin override
    }
  },
  computed: {
    messages () {
      if (!this.c_value) {
        return []
      }
      if (!Array.isArray(this.c_value)) {
        return [this.c_value]
      }
      return this.c_value.slice(0, this.limit)
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
