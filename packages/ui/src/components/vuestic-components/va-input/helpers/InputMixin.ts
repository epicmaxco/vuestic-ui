import Cleave from 'cleave.js'
import { Mixins, Prop, Watch } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { CleaveOptions } from 'cleave.js/options'
import { FormComponentMixin } from '../../../vuestic-mixins/FormComponent/FormComponentMixin'

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

@Component
export class InputMixin extends Mixins(FormComponentMixin) {
  inputElement: Cleave | null = null
  eventListeners: any = null
  isFocused = false

  // Mask option list - https://github.com/nosir/cleave.js/blob/master/doc/options.md#blocks
  @Prop({
    type: [String, Object],
    default: () => ({}),
  }) mask!: string | object

  @Prop({
    type: Boolean,
    default: true,
  }) returnRaw!: boolean

  @Prop({ type: Boolean, default: false }) removable!: boolean

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
    return this.success || this.computedError || this.canBeCleared
  }

  get canBeCleared (): boolean {
    return this.hasContent && this.removable
  }

  get hasContent (): boolean {
    return ![null, undefined, ''].includes(this.value)
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

  onPrependClick (event: Event): void {
    this.$emit('click:prepend', event)
  }

  onPrependInnerClick (event: Event): void {
    this.$emit('click:prepend-inner', event)
  }

  onAppendClick (event: Event): void {
    this.$emit('click:append', event)
  }

  onAppendInnerClick (event: Event): void {
    this.$emit('click:append-inner', event)
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
