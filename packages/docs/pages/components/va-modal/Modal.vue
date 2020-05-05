<template>
  <div>
    <va-content>
      <h1>Modal</h1>
      <p class="margin-bottom">
        Some basic description
      </p>
      <h3>Basic element</h3>
      <p>This is the basic modal component implementation</p>
    </va-content>
    <DocsExample value="va-modal/Basic" />
  </div>
</template>

<script>
import Vue from 'vue'
import VaContent from '../../../../ui/src/components/vuestic-components/va-content/VaContent'
import DocsExample from '../../../components/DocsExample'

export default Vue.extend({
  components: {
    VaContent,
    DocsExample,
  },
})
</script>
