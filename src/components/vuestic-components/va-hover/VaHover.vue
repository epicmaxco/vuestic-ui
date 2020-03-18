<script>
export default {
  name: 'VaHover',
  data () {
    return {
      active: false,
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
    },
  },
  methods: {
    onMouseEnter (e) {
      this.active = true
      this.$emit('input', true)
    },
    onMouseLeave (e) {
      this.active = false
      this.$emit('input', false)
    },
  },
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
  },
}
</script>
