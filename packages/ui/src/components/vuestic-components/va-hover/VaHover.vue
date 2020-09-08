<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator'
import { ScopedSlotChildren } from 'vue/types/vnode'
import { CreateElement } from 'vue/types/umd'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

@Component({
  name: 'VaHover',
})
export default class VaHover extends Mixins(StatefulMixin) {
  @Prop({
    type: Boolean,
    default: false,
  }) readonly disabled!: boolean

  onMouseEnter () {
    this.value = true
    this.$emit('input', true)
  }

  onMouseLeave () {
    this.value = false
    this.$emit('input', false)
  }

  render (h: CreateElement) {
    if (!this.$scopedSlots.default) {
      return
    }

    const slot: ScopedSlotChildren = this.$scopedSlots.default({ hover: this.value })

    if (!Array.isArray(slot) || !slot.length) {
      return
    }

    if (!this.disabled) {
      slot.forEach((element) => {
        element.data = element.data || {}
        // is used to bind listeners using vue native function
        // @ts-ignore
        this._g(element.data, {
          mouseenter: this.onMouseEnter,
          mouseleave: this.onMouseLeave,
        })
      })
    }
    return h('div', slot)
  }
}
</script>
