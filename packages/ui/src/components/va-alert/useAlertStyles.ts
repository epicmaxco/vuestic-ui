import { computed } from 'vue'

import { useColors } from '../../services/color-config/color-config'
import { getTextColor } from '../../services/color-config/color-functions'

type AlertStyleProps = {
  modelValue: boolean,
  color: string,
  title: string,
  description: string,
  icon: string,
  closeText: string,
  closeable: boolean,
  dense: boolean,
  outline: boolean,
  center: boolean,
  borderColor: string,
  border: string,
}

export const useAlertStyles = (props: AlertStyleProps) => {
  const dark = 'var(--va-dark)'

  const { getColor } = useColors()

  const colorComputed = computed(() => getColor(props.color))

  const alertStyle = computed(() => {
    let background = colorComputed.value
    let boxShadow = 'none'

    if (props.outline) {
      background = 'transparent'
    }

    if (props.border) {
      background = '#ffffff'
      boxShadow = 'var(--va-alert-box-shadow)'
    }

    return {
      border: props.outline ? `1px solid ${colorComputed.value}` : '',
      padding: props.dense ? '0.25rem 0.75rem' : '',
      background,
      boxShadow,
    }
  })

  const contentStyle = computed(() => {
    let color = getTextColor(colorComputed.value)

    if (props.outline) {
      color = colorComputed.value
    }

    if (props.border) {
      color = dark
    }

    return {
      alignItems: props.center ? 'center' : '',
      color,
    }
  })

  const titleStyle = computed(() => {
    let color = getTextColor(colorComputed.value)

    if (props.outline) {
      color = colorComputed.value
    }

    if (props.border) {
      color = colorComputed.value
    }

    return { color }
  })

  const borderStyle = computed(() => ({
    backgroundColor: props.borderColor
      ? getColor(props.borderColor)
      : colorComputed.value,
  }))

  return {
    alertStyle,
    contentStyle,
    titleStyle,
    borderStyle,
  }
}
