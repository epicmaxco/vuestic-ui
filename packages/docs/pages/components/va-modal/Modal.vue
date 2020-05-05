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
    <Example value="va-modal/Basic">
      <template slot="description">
        <p class="margin-bottom">
          Some basic description
        </p>
      </template>
    </Example>
  </div>
</template>

<script>
import Vue from 'vue'
import VaContent from '../../../../ui/src/components/vuestic-components/va-content/VaContent'
import Example from '../../../components/Example'

export default Vue.extend({
  components: {
    VaContent,
    Example,
  },
})
</script>
