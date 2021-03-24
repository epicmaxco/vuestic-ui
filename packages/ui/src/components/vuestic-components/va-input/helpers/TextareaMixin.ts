import { watch } from 'vue'
import { mixins, prop, Vue, setup } from 'vue-class-component'
import calculateNodeHeight from '../calculateNodeHeight'
import { warn } from '../../../../services/utils'
import { StatefulMixin } from '../../../vuestic-mixins/StatefulMixin/StatefulMixin'

class Props {
  autosize = prop<boolean>({ type: Boolean, default: false })
  minRows = prop<number>({
    type: Number,
    default: null,
    validator: (val: number) => {
      if (!(val > 0 && (val | 0) === val)) {
        return warn(`\`minRows\` must be a positive integer greater than 0, but ${val} is provided`)
      }
      return true
    },
  })

  maxRows = prop<number>({
    type: Number,
    validator: (val: number) => {
      if (!(val > 0 && (val | 0) === val)) {
        return warn(`\`minRows\` must be a positive integer greater than 0, but ${val} is provided`)
      }
      return true
    },
    default: null,
  })

  type = prop<string>({ type: String, default: 'text' })
  label = prop<string>({ type: String, default: '' })
}

const PropsMixin = Vue.with(Props)

export class TextareaMixin extends mixins(StatefulMixin, PropsMixin) {
  context = setup(() => {
    watch(() => this.$props.modelValue, () => {
      // only for textarea
      if (this.isTextarea) {
        this.adjustHeight()
      }
    })

    return {}
  })

  get textareaStyles (): any {
    return {
      // paddingBottom: this.label ? '0.125rem' : '',
      marginTop: this.label ? '0.875rem' : '',
      paddingTop: this.label ? 0 : '',
      minHeight: this.label ? '1.5rem' : '2.25rem',
      resize: this.autosize ? 'none' : 'vertical',
      // marginBottom: 0,
    }
  }

  get isTextarea (): boolean {
    return this.type === 'textarea'
  }

  adjustHeight (): void {
    if (!this.autosize || !this.isTextarea) {
      return
    }

    const minRows = this.minRows || 1
    const maxRows = this.maxRows || Number.MAX_SAFE_INTEGER
    const textareaStyles = calculateNodeHeight(this.$refs.textarea, false, minRows, maxRows)

    // We modify DOM directly instead of using reactivity because the whole adjustHeight method takes place
    // each time the value of textarea is modified, so there's no real need in an additional layer of reactivity.
    // The operation is basically reactive though implicitly.
    Object.assign((this as any).$refs.textarea.style, textareaStyles)
  }

  mounted (): void {
    this.adjustHeight()
  }
}
