import { computed } from 'vue'

export const useAlignProps = {
  align: {
    type: String,
    default: 'left',
  },
  vertical: {
    type: Boolean,
    default: false,
  },
}

const horizontalMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

const verticalMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  stretch: 'stretch',
}

const justify = (align: string, vertical: boolean) => {
  return vertical
    ? 'center'
    : align
      ? horizontalMap[align as keyof typeof horizontalMap]
      : 'flex-start'
}

const items = (align: string, vertical: boolean) => {
  return vertical ? verticalMap[align as keyof typeof verticalMap] : 'center'
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
