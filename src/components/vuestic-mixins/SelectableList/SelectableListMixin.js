import { FormComponentMixin } from '../FormComponent/FormComponentMixin'

//Maybe we need to add some kind of fallback value to these helper methods
//And to extract some in some kind of utility file 'cause I suppose they 
//might become useful somewhere else at some point

const getNestedValue = (option, propsArray) => {
  const lastPropIndex = propsArray.length - 1
  if (lastPropIndex < 0) return option

  let nestedObj = option[propsArray[0]]

  for (let i = 1; i < lastPropIndex; i++) {
    if (nestedObj === null) {
      return option
    }
    nestedObj = nestedObj[propsArray[i]]
  }

  if (nestedObj === null) return option

  return nestedObj[propsArray[lastPropIndex]]
}

const getValueByPath = (option, prop) => {
  if (option === null || typeof prop !=='string' || !prop) return option
  if (option[prop] !== undefined) return option[prop]
  prop = prop.replace(/^\./, '') //remove first point symbol
  return getNestedValue(option, prop.split('.'))
}

const getProp = (option, prop) => {
  if (!prop) return option
  if (typeof prop === 'string') return getValueByPath(option, prop)
  if (typeof prop === 'function') return prop(option)
  return option
}

export const SelectableListMixin = {
  mixins: [FormComponentMixin],
  props: {
    options: { type: Array, default: () => [] },
    textBy: { type: [String, Function], default: 'text' },
    valueBy: { type: [String, Function], default: 'value' },
    trackBy: { type: [String, Function], default: 'value' },
    disabledBy: { type: [String, Function], default: 'disabled' },
    outputObject: { type: Boolean, default: false }
  },
  methods: {
    getValue (option) {
      return getProp(option, this.valueBy)
    },
    getText (option) {
      return getProp(option, this.textBy)
    },
    getDisabled (option) {
      return getProp(option, this.disabledBy)
    },
    getTrackBy (option) {
      return getProp(option, this.trackBy)
    }
  },
  created () {
    this.isSelectableListComponent = true
  }
}