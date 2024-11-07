import { computed, toRef } from 'vue'
import { useColors, useCurrentElement, useElementBackground, useElementTextColor } from '../../composables'

type AlertStyleProps = {
  modelValue: boolean,
  color: string,
  textColor: string,
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
  const { getColor } = useColors()

  const isTransparentBackground = computed(() => Boolean(props.outline || props.border))
  const textColorComputed = useElementTextColor(toRef(props, 'color'), isTransparentBackground)

  const colorComputed = computed(() => getColor(props.color))

  const alertStyle = computed(() => {
    let background = colorComputed.value
    let boxShadow = 'none'

    if (props.outline) {
      background = 'transparent'
    }

    if (props.border) {
      background = 'var(--va-background-primary)'
      boxShadow = 'var(--va-alert-box-shadow)'
    }

    return {
      border: props.outline ? `1px solid ${colorComputed.value}` : '',
      padding: props.dense ? 'var(--va-alert-padding-y-dense) var(--va-alert-padding-x)' : '',
      backgroundColor: background,
      boxShadow,
    }
  })

  const currentColor = useElementTextColor(useElementBackground(useCurrentElement()))

  const contentStyle = computed(() => {
    return {
      alignItems: props.center ? 'center' : '',
      color: (props.border || props.outline) ? currentColor.value : textColorComputed.value,
    }
  })

  const titleStyle = computed(() => {
    return { color: textColorComputed.value }
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
