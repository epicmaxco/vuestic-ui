import Cleave from 'cleave.js'
import { watch } from 'vue'
import { mixins, prop, setup, Vue } from 'vue-class-component'
import { CleaveOptions } from 'cleave.js/options'
import { StatefulMixin } from '../../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { FormComponentMixin } from '../../../vuestic-mixins/FormComponent/FormComponentMixin'

const DEFAULT_MASK_TOKENS: Record<string, Record<string, unknown>> = {
  creditCard: {
    creditCard: true,
  },
  date: {
    date: true,
    datePattern: ['d', 'm', 'Y'],
  },
  time: {
    time: true,
    timePattern: ['h', 'm'],
    timeFormat: '24',
  },
  numeral: {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
  },
}

class Props {
  // Mask option list - https://github.com/nosir/cleave.js/blob/master/doc/options.md#blocks
  mask = prop<string | CleaveOptions>({
    type: [String, Object],
    default: () => ({}),
  })

  returnRaw = ({
    type: Boolean,
    default: true,
  })

  removable = prop({ type: Boolean, default: false })
  loading = prop({ type: Boolean, default: false })
  canBeFocused = prop({ type: Boolean, default: true })
  focused = prop({ type: Boolean, default: undefined })
  modelValue = prop<string | number>({ type: [String, Number], default: '' })
}

const PropsMixin = Vue.with(Props)

export class InputMixin extends mixins(FormComponentMixin, StatefulMixin, PropsMixin) {
  inputElement: Cleave | null = null
  eventListeners: any = {}
  isFocused = false

  get isFocusedComputed () {
    if (this.$props.focused === undefined) {
      return this.isFocused
    }

    return this.$props.focused
  }

  set isFocusedComputed (value: boolean) {
    if (this.$props.focused === undefined) {
      this.isFocused = value
    }

    this.$emit('update:focused', value)
  }

  context = setup(() => {
    watch(() => this.$props.mask, (mask: string | CleaveOptions) => {
      this.destroyCleaveInstance()
      this.inputElement = new Cleave(this.$refs.input as HTMLInputElement, this.getMask(mask))
      this.inputElement.setRawValue(this.modelValue)
    })

    return {}
  })

  get computedValue (): string {
    if (!this.inputElement) {
      return this.modelValue
    }
    if (this.returnRaw && this.modelValue === this.inputElement.getRawValue()) {
      return this.inputElement.getFormattedValue()
    }
    return this.modelValue
  }

  get showIcon (): boolean {
    return this.success || this.computedError || this.canBeCleared || this.loading
  }

  get canBeCleared (): boolean {
    return this.hasContent && this.removable
  }

  get hasContent (): boolean {
    return ![null, undefined, ''].includes(this.modelValue)
  }

  onInput (event: any): void {
    if (typeof this.mask !== 'string' && !Object.keys(this.mask).length) {
      this.$emit('update:modelValue', event.target.value)
      return
    }
    if (this.inputElement) {
      this.inputElement.setRawValue(event.target.value)
      if (this.returnRaw) {
        this.$emit('update:modelValue', this.inputElement.getRawValue())
        return
      }
    }
    this.$emit('update:modelValue', event.target.value)
  }

  onChange (event: any): void {
    if (typeof this.mask !== 'string' && !Object.keys(this.mask).length) {
      this.$emit('change', event.target.value)
      return
    }
    if (this.inputElement) {
      this.inputElement.setRawValue(event.target.value)
      if (this.returnRaw) {
        this.$emit('change', this.inputElement.getRawValue())
        return
      }
    }
    this.$emit('change', event.target.value)
  }

  onClick (event: Event): void {
    this.$emit('click', event)
  }

  onPrependClick (event: Event): void {
    this.$emit('click-prepend', event)
  }

  onPrependInnerClick (event: Event): void {
    this.$emit('click-prepend-inner', event)
  }

  onAppendClick (event: Event): void {
    this.$emit('click-append', event)
  }

  onAppendInnerClick (event: Event): void {
    this.$emit('click-append-inner', event)
  }

  onFocus (event: Event): void {
    if (this.canBeFocused) {
      this.isFocusedComputed = true
    }

    this.$emit('focus', event)
  }

  onBlur (event: Event): void {
    this.isFocusedComputed = false
    this.ValidateMixin_onBlur()
    this.$emit('blur', event)
  }

  onKeyup (event: Event): void {
    this.$emit('keyup', event)
  }

  onKeydown (event: Event): void {
    this.$emit('keydown', event)
  }

  getMask (mask: CleaveOptions | string) {
    if (typeof mask === 'string') {
      return DEFAULT_MASK_TOKENS[mask] ? { ...DEFAULT_MASK_TOKENS[mask] } : {}
    }
    return { ...mask }
  }

  destroyCleaveInstance () {
    if (this.inputElement) {
      this.inputElement.destroy()
    }
  }

  initInput () {
    if (this.$refs.input) {
      this.inputElement = new Cleave(this.$refs.input as HTMLInputElement, this.getMask(this.mask))
    }
    this.setEventListeners()
  }

  setEventListeners () {
    this.eventListeners = {
      input: this.onInput,
      change: this.onChange,
      click: this.onClick,
      focus: this.onFocus,
      blur: this.onBlur,
      keyup: this.onKeyup,
      keydown: this.onKeydown,
    }
  }

  mounted () {
    this.initInput()
  }

  /**
   * Free up memory
   */
  beforeUnmount () {
    this.destroyCleaveInstance()
  }
}
