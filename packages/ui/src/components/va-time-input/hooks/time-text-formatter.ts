export const useTimeFormatter = (props: {
  ampm?: boolean,
  view?: 'hours' | 'minutes' | 'seconds'
  format?: (date: Date) => string
}) => {
  const formatDate = (date: Date) => {
    if (!date) { return '' }

    if (props.ampm) {
      return date.toLocaleTimeString('en-US')
    }

    return date.toLocaleTimeString('en-GB')
  }

  const sliceTime = (time: string, start: number, end: number) => time.split(':').slice(start, end).join(':')

  const formatWithView = (date: Date) => {
    if (props.view === 'seconds') {
      return formatDate(date)
    }

    const [time, period] = formatDate(date).split(' ')

    if (props.view === 'minutes') {
      if (!period) { return sliceTime(time, 0, 2) }

      return [sliceTime(time, 0, 2), period].join(' ')
    }

    if (props.view === 'hours') {
      if (!period) { return sliceTime(time, 0, 1) }

      return [sliceTime(time, 0, 1), period].join(' ')
    }

    return ''
  }

  return {
    format: (date: Date) => props.format ? props.format(date) : formatWithView(date),
  }
}
