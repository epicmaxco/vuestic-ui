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
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'

const MessageListPropsMixin = makeContextablePropsMixin({
  value: { type: [String, Number, Object, Array], default: '' },
  limit: { type: Number, default: 1 },
  color: { type: String, default: 'gray' },
})

@Component({
  name: 'VaMessageList',
})
export default class VaMessageList extends Mixins(
  ColorThemeMixin,
  MessageListPropsMixin,
) {
  colorThemeDefault = 'gray' // mixin override

  get messages () {
    if (!this.c_value) {
      return []
    }
    if (!Array.isArray(this.c_value)) {
      return [this.c_value]
    }
    return this.c_value.slice(0, this.limit)
  }

  get computedStyle () {
    return {
      color: this.colorComputed,
    }
  }
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
