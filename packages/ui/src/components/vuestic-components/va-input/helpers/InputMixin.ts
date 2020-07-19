import Cleave from 'cleave.js'
import { makeContextablePropsMixin } from '../../../context-test/context-provide/ContextPlugin'
import { Mixins, Watch } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { CleaveOptions } from 'cleave.js/options'

const DEFAULT_MASK_TOKENS: Record<string, object> = {
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
const PropsMixin = makeContextablePropsMixin({
  // Mask option list - https://github.com/nosir/cleave.js/blob/master/doc/options.md#blocks
  mask: {
    type: [String, Object],
    default: () => ({}),
  },
  returnRaw: {
    type: Boolean,
    default: true,
  },
})

@Component
export class InputMixin extends Mixins(PropsMixin) {
  inputElement: Cleave | null = null
  eventListeners: any = null
  isFocused = false

  @Watch('mask', { deep: true })
  onOptionsChange (mask: CleaveOptions | string) {
    this.destroyCleaveInstance()
    this.inputElement = new Cleave(this.$refs.input as HTMLInputElement, this.getMask(mask))
    this.inputElement.setRawValue(this.value)
  }

  get computedValue (): string {
    if (!this.inputElement) {
      return this.value
    }
    if (this.returnRaw && this.value === this.inputElement.getRawValue()) {
      return this.inputElement.getFormattedValue()
    }
    return this.value
  }

  get showIcon (): boolean {
    return this.c_success || this.computedError || this.canBeCleared
  }

  get canBeCleared (): boolean {
    return this.hasContent && this.c_removable
  }

  get hasContent (): boolean {
    return ![null, undefined, ''].includes(this.c_value)
  }

  onInput (event: any): void {
    if (typeof this.mask !== 'string' && !Object.keys(this.mask).length) {
      this.$emit('input', event.target.value)
      return
    }
    if (this.inputElement) {
      this.inputElement.setRawValue(event.target.value)
      if (this.returnRaw) {
        this.$emit('input', this.inputElement.getRawValue())
        return
      }
    }
    this.$emit('input', event.target.value)
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

  onFocus (event: Event): void {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    this.isFocused = true
    this.$emit('focus', event)
  }

  onBlur (event: Event): void {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
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
  beforeDestroy () {
    this.destroyCleaveInstance()
  }

  /** @public */
  focus (): void {
    (this as any).$refs.input.focus()
  }

  /** @public */
  reset (): void {
    this.$emit('input', '')
  }
}
