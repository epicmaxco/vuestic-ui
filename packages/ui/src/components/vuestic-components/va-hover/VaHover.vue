<script lang="ts">
import { Mixins, Prop } from 'vue-property-decorator'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { Options } from 'vue-class-component'
import { h } from 'vue'

@Options({
  name: 'VaHover',
  emits: ['update:modelValue'],
})
export default class VaHover extends Mixins(StatefulMixin) {
  @Prop({
    type: Boolean,
    default: false,
  }) readonly disabled!: boolean

  @Prop({
    type: Boolean,
    default: false,
  }) modelValue!: boolean

  onMouseEnter () {
    this.$emit('update:modelValue', true)
  }

  onMouseLeave () {
    this.$emit('update:modelValue', false)
  }

  render () {
    if (!(this.$slots as any)?.default()) {
      return
    }

    const slot = (this.$slots as any).default({ hover: this.modelValue })

    if (!Array.isArray(slot) || !slot.length) {
      return
    }

    // if (!this.disabled) {
    //   slot.forEach((element) => {
    //     console.log('element')
    //     element.data = element.data || {}
    //     // is used to bind listeners using vue native function
    //     // @ts-ignore
    //     ;(this as any)._g(element.data, {
    //       mouseenter: this.onMouseEnter,
    //       mouseleave: this.onMouseLeave,
    //     })
    //   })
    // }
    return h('div', !this.disabled ? {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
    } : {}, slot)
  }
}
</script>
