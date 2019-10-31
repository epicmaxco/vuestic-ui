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
          color: 'danger',
          label: 'A',
          icon: 'person',
          size: 'large',
          fontSize: '60px',
        },
        VaCard: {
          stripe: 'success',
          color: 'secondary',
        },
        VaButton: {
          size: 'small',
          color: 'danger',
          outline: true,
        },
        VaSlider: {
          color: 'danger',
        },
        VaProgressBar: {
          color: 'danger',
          size: 'large',
        },
        VaInput: {
          readonly: true,
        },
        VaFileUpload: {
          type: 'gallery',
          color: 'danger',
        },
        VaPagination: {
          size: 'small',
          visiblePages: 3,
          color: 'danger',
          directionLinks: false,
        },
      },
    }
  },
}
</script>
