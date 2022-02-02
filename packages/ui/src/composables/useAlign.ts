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

const justify = (align: string, vertical: boolean) => {
  return vertical
    ? 'center'
    : align
      ? horizMap[align as keyof typeof horizMap]
      : 'flex-start'
}

const items = (align: string, vertical: boolean) => {
  return vertical ? vertMap[align as keyof typeof vertMap] : 'center'
}

export function useAlign (props: any) {
  const alignComputed = computed(() => {
    return {
      display: 'flex',
      flexDirection: props.vertical ? 'column' : 'row' as 'row' | 'column',
      justifyContent: justify(props.align, props.vertical),
      alignItems: items(props.align, props.vertical),
    }
  })

  return {
    alignComputed,
  }
}
