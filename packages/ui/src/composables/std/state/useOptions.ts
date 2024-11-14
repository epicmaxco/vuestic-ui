import { ref, Ref } from 'vue'
import { getValueByKey } from '../../../utils/value-by-key'

export type Option = unknown
// TODO: Notice, so some reason nesting generic types doesn't work with defineProps and ExtractPropTypes in Vue 3.
// Keep string for now until it's fixed.
export type OptionKey<O extends Option> = string // O extends Record<infer K, any> ? K : string
// TODO: Maybe use StringWithAutoCompletion instead strict string
export type OptionKeyBy<O extends Option> = OptionKey<O> | ((o: O) => OptionKey<O>)

export const useOptions = <O extends Option>(options: Ref<O[]>) => {
  const getBy = <Op extends O, K extends OptionKey<O>>(option: Op, key: K | ((o: Op) => K)) => {
    return getValueByKey(option, key)
  }

  const resolveOptionByKey = <T>(key: OptionKeyBy<O>, value: T): O | undefined => {
    const optionList = options.value

    for (let i = 0; i < options.value.length; i++) {
      if (getBy(optionList[i], key) === value) {
        return options.value[i]
      }
    }
  }

  return {
    resolveOptionByKey,
    getBy,
  }
}
