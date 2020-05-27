<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ScopedSlotChildren } from 'vue/types/vnode'
import { CreateElement } from 'vue/types/umd'

@Component
export default class VaHover extends Vue {
  active = false

  @Prop({
    type: Boolean,
    default: false,
  }) readonly disabled!: boolean

  @Prop({
    type: Boolean,
  }) readonly value!: boolean

  onMouseEnter () {
    this.active = true
    this.$emit('input', true)
  }

  onMouseLeave () {
    this.active = false
    this.$emit('input', false)
  }

  render (h: CreateElement) {
    if (!this.$scopedSlots.default) {
      return
    }

    const slot: ScopedSlotChildren = this.$scopedSlots.default({ hover: this.value || this.active })

    if (!Array.isArray(slot) || !slot.length) {
      return
    }

    if (!this.disabled) {
      slot.filter(({ data }) => !!data).forEach(({ data }) => {
      // is used to bind listeners using vue native function
      // @ts-ignore
        this._g(data, {
          mouseenter: this.onMouseEnter,
          mouseleave: this.onMouseLeave,
        })
      })
    }
    return h('div', slot)
  }
}
</script>
