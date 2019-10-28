const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  stretch: 'stretch',
}

const alignValues = Object.keys(alignMap)

export const AlignMixin = {
  props: {
    align: {
      type: String,
      default: 'left',
      validator: (align) => alignValues.includes(align),
    },
  },

  computed: {
    alignComputed () {
      return {
        display: 'flex',
        justifyContent: alignMap[this.align],
      }
    },
  },
}
