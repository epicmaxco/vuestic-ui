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
import { Options } from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const MessageListPropsMixin = makeContextablePropsMixin({
  modelValue: { type: [String, Number, Object, Array], default: '' },
  limit: { type: Number, default: 1 },
  color: { type: String, default: 'gray' },
})

@Options({
  name: 'VaMessageList',
})
export default class VaMessageList extends Mixins(
  ColorThemeMixin,
  MessageListPropsMixin,
) {
  colorThemeDefault = 'gray' // mixin override

  get messages () {
    if (!this.c_modelValue) {
      return []
    }
    if (!Array.isArray(this.c_modelValue)) {
      return [this.c_modelValue]
    }
    return this.c_modelValue.slice(0, this.limit)
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
