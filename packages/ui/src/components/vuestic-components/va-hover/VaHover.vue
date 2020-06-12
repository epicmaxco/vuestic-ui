<script lang="ts">
// @ts-nocheck
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({

})
export default class VaHover extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled!: boolean

  @Prop({
    type: Boolean,
  })
  readonly value!: boolean

  data () {
    return {
      active: false,
    }
  }

  onMouseEnter (): void {
    (this as any).active = true
    this.$emit('input', true)
  }

  onMouseLeave (): void {
    (this as any).active = false
    this.$emit('input', false)
  }

  render () {
    let element

    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default({ hover: this.value || this.active })
    }

    if (Array.isArray(element) && element.length === 1) {
      element = element[0]
    }

    if (!this.disabled) {
      element.data = element.data || {}

      this._g(element.data, {
        mouseenter: this.onMouseEnter,
        mouseleave: this.onMouseLeave,
      })
    }

    return element
  }
}
</script>
