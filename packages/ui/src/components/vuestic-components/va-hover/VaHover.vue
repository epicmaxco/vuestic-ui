<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'VaHover',
})
export default class VaHover extends Vue {
  active = false

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled!: boolean

  @Prop({
    type: Boolean,
  })
  readonly value!: boolean

  onMouseEnter (): void {
    this.active = true
    this.$emit('input', true)
  }

  onMouseLeave (): void {
    this.active = false
    this.$emit('input', false)
  }

  render () {
    let element: any

    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default({ hover: this.value || this.active })
    }

    if (Array.isArray(element) && element.length === 1) {
      element = element[0]
    }

    if (!this.disabled) {
      element.data = element.data || {}
      ;(this as any)._g(element.data, {
        mouseenter: this.onMouseEnter,
        mouseleave: this.onMouseLeave,
      })
    }

    return element
  }
}
</script>
