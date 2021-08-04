import { PropType, computed } from 'vue'

export const useAlignProps = {
  align: {
    type: String as PropType<string>,
    default: 'left',
  },
  vertical: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

const horizMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

const vertMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  stretch: 'stretch',
}

const justify = (align: string) => {
  return horizMap[align as keyof typeof horizMap]
}

const items = () => {
  return 'center'
}

export function useAlign (props: any) {
  const alignComputed = computed(() => {
    return {
      display: 'flex',
      justifyContent: justify(props.align),
      alignItems: items(),
    }
  })

  return {
    alignComputed,
  }
}
