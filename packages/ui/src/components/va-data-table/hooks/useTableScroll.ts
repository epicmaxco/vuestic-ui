interface useTableScrollProps {
  stickyHeader: boolean
  stickyFooter: boolean
  height: string | number | undefined
  scrollEventsThreshold: number | undefined
}

export default function useTableScroll (
  props: useTableScrollProps,
  emit: (event: 'scroll:bottom' | 'scroll:top', ...args: any[]) => void,
) {
  const onScroll = (evt: Event) => {
    if (!(props.stickyHeader || props.stickyFooter || props.height)) {
      return
    }

    if (props.scrollEventsThreshold === undefined) {
      return
    }

    const { scrollTop, scrollHeight, clientHeight } = evt.target as HTMLTableElement

    if (scrollHeight - clientHeight - scrollTop <= props.scrollEventsThreshold) {
      emit('scroll:bottom', evt)
    }

    if (scrollTop <= props.scrollEventsThreshold) {
      emit('scroll:top', evt)
    }
  }

  return {
    onScroll,
  }
}
