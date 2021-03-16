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

<script lang="ts">
import { Options, prop, Vue, mixins } from 'vue-class-component'

import ColorMixin from '../../../../services/color-config/ColorMixin'

class MessagesListProps {
  value = prop<string | number | object | any[]>({ type: [String, Number, Object, Array], default: '' })
  limit = prop<number>({ type: Number, default: 1 })
  color = prop<string>({ type: String, default: 'gray' })
}

const MessagesListPropsMixin = Vue.with(MessagesListProps)

@Options({
  name: 'VaMessageList',
})
export default class VaMessageList extends mixins(
  ColorMixin,
  MessagesListPropsMixin,
) {
  colorThemeDefault = 'gray' // mixin override

  get messages () {
    if (!this.value) {
      return []
    }
    if (!Array.isArray(this.value)) {
      return [this.value]
    }
    return this.value.slice(0, this.limit)
  }

  get computedStyle () {
    return {
      color: this.colorComputed,
    }
  }
}
</script>

<style lang="scss">
@import "../../../vuestic-sass/resources/resources";

.va-message-list {
  &__message {
    vertical-align: middle;
    font-size: $font-size-mini;
  }
}
</style>
