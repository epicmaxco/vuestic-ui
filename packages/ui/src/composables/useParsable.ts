import { computed, Ref } from 'vue'

type Not<P, N> = P extends N ? never : P
export const useParsable = <Text extends string | number, Original, Value extends Not<Original, Text>>(
  parsable: Ref<Original>,
  parse: (t: Text) => Value,
  format: (v: Value) => Text,
) => {
  const text = computed({
    get () {
      const value = parsable.value
      if (typeof value === 'string') {
        return value as any
      }
      return format(value as Value)
    },
    set (v: Text) {
      if (typeof parsable.value === 'string') {
        parsable.value = v as any
      } else {
        parsable.value = parse(v)
      }
    },
  })

  const value = computed<Value>({
    get () {
      if (typeof parsable.value === 'string') {
        return parse(parsable.value as any)
      }

      return parsable.value as Value
    },
    set (v: Value) {
      if (typeof parsable.value === 'string') {
        parsable.value = format(v as any) as any
      } else {
        parsable.value = v
      }
    },
  })

  return {
    text,
    value,
  }
}
