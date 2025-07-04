import { computed } from "vue"

interface SkipLinkProps {
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

export const usePosition = (props: SkipLinkProps) => {
  const position = computed(() => {
    const positionMap = {
      'top-right': { top: '1rem', right: '1rem' },
      'top-left': { top: '1rem', left: '1rem' },
      'bottom-right': { bottom: '1rem', right: '1rem' },
      'bottom-left': { bottom: '1rem', left: '1rem' },
    }

    return positionMap[props.position]
  })

  return { position }
}
