<template>
  <div>
    <va-context :config="contextConfig">
      <ContextSwapExampleSnippet/>
    </va-context>
    <pre style="color: white">{{contextConfig}}</pre>
  </div>
</template>

<script>
import VaContext
  from '../../../src/components/context-test/context-provide/VaContext'
import ContextSwapExampleSnippet from './ContextSwapExampleSnippet'

export default {
  components: {
    ContextSwapExampleSnippet,
    VaContext,
  },
  data () {
    return {
      contextConfig: {
        VaAvatar: {
          color: 'info',
          label: 'A',
          icon: 'person',
          size: 'large',
          fontSize: '60px',
        },
        VaCard: {
          stripe: 'info',
          color: 'secondary',
        },
        VaButton: {
          size: 'small',
          color: 'info',
          outline: true,
        },
        VaSlider: {
          color: 'info',
        },
        VaProgressBar: {
          color: 'info',
          size: 'large',
        },
        VaInput: {
          readonly: true,
          color: 'info'
        },
        VaFileUpload: {
          type: 'gallery',
          color: 'info',
        },
        VaPagination: {
          size: 'small',
          visiblePages: 3,
          color: 'info',
          directionLinks: false,
        },
        VaCheckbox: {
          size: 'large',
          color: 'info'
        }
      },
    }
  },
}
</script>
