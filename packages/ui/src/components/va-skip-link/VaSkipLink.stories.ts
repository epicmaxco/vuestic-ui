import { VaSkipLink } from './'

export default {
  title: 'VaSkipLink',
  component: VaSkipLink,
}

export const Target = () => ({
  components: { VaSkipLink },
  template: `
    <va-skip-link target="#target">
      [skip link]
    </va-skip-link>
    <div :style="{ height: '100dvh' }">
      [not target]
    </div>
    <div 
      id="target" 
      :style="{ height: '100dvh' }"
    >
      [target]
    </div>
  `,
})

export const PositionTopLeft = () => ({
  components: { VaSkipLink },
  template: `
    <va-skip-link position="top-left">
      [top-left]
    </va-skip-link>
  `,
})

export const PositionTopRight = () => ({
  components: { VaSkipLink },
  template: `
    <va-skip-link position="top-right">
      [top-right]
    </va-skip-link>
  `,
})

export const PositionBottomLeft = () => ({
  components: { VaSkipLink },
  template: `
    <va-skip-link position="bottom-left">
      [bottom-left]
    </va-skip-link>
  `,
})

export const PositionBottomRight = () => ({
  components: { VaSkipLink },
  template: `
    <va-skip-link position="bottom-right">
      [bottom-right]
    </va-skip-link>
  `,
})
