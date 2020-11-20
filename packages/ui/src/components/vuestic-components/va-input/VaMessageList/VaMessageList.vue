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
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'

@Component({
  name: 'VaMessageList',
})
export default class VaMessageList extends Mixins(
  ColorThemeMixin,
) {
  colorThemeDefault = 'gray' // mixin override

  @Prop({ type: [String, Number, Object, Array], default: '' }) value!: string | number | object | any[]
  @Prop({ type: Number, default: 1 }) limit!: number
  @Prop({ type: String, default: 'gray' }) color!: string

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
