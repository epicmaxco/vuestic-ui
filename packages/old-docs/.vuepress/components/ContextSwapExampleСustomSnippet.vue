<template>
  <div>
    <va-context :config="contextConfig">
      <ContextSwapExampleSnippet />
    </va-context>
    <pre style="color: white;">{{ contextConfig }}</pre>
  </div>
</template>

<script>
import VaContext
  from '../../../ui/src/components/context-test/context-provide/VaContext'
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
          color: 'warning',
          label: 'A',
          icon: 'person',
          size: 'small',
          fontSize: '60px',
        },
        VaCard: {
          stripe: 'warning',
          color: 'dark',
          headerColor: 'warning',
        },
        VaButton: {
          size: 'small',
          color: 'warning',
          outline: true,
        },
        VaSlider: {
          color: 'warning',
        },
        VaProgressBar: {
          color: 'warning',
          size: 'large',
        },
        VaInput: {
          readonly: true,
          color: 'warning',
        },
        VaFileUpload: {
          type: 'gallery',
          color: 'warning',
        },
        VaPagination: {
          size: 'small',
          visiblePages: 3,
          color: 'warning',
          directionLinks: false,
        },
        VaCheckbox: {
          size: 'small',
          color: 'warning',
        },
      },
    }
  },
}
</script>
