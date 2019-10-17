<template>
  <VbDemo>
    <VbCard title="Default">
      <va-test>Global theme test</va-test>
      <va-test color="warning">Local warning color</va-test>
      <va-test color="success">Local success color</va-test>
      <va-test color="dark">Local dark color</va-test>
      <va-test />
    </VbCard>

    <VbCard title="With context component">
      <va-context :config="{ VaTest: { color: 'warning' } }">
        <span>
          <va-test>Global theme test</va-test>

          <va-context :config="{ VaTest: { color: 'danger' } }">
            <va-test>Global theme test</va-test>
          </va-context>
        </span>
      </va-context>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTest from './ContextTest'
import VaContext from '../../services/ContextProvidePlugin'

export default {
  components: {
    VaTest,
    VaContext,
  },
}
</script>
