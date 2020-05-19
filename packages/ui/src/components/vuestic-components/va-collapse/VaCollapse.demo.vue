<template>
  <VbDemo>
    <VbCard title="Default">
      <va-collapse style="width: 400px;">
        <span slot="header">{{ collapseHeader }}</span>
        <div>
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>
    <VbCard title="Custom header">
      <va-collapse
        style="width: 400px;"
        custom-header
      >
        <va-button
          slot="header"
          style="width: 100%;"
        >
          {{ collapseHeader }}
        </va-button>
        <div>
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>
    <VbCard title="With background">
      <va-collapse
        style="width: 400px;"
        with-background
      >
        <span slot="header">{{ collapseHeader }}</span>
        <div>
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>
    <VbCard title="Is open default">
      <va-collapse
        style="width: 400px;"
        is-open-default
      >
        <span slot="header">{{ collapseHeader }}</span>
        <div>
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>
    <VbCard title="looooong texts">
      <va-collapse
        style="width: 400px;"
        default-value
      >
        <span slot="header">{{ collapseHeader }} {{ collapseHeader }} {{ collapseHeader }} {{ collapseHeader }} {{ collapseHeader }} {{ collapseHeader }} {{ collapseHeader }} {{ collapseHeader }} {{ collapseHeader }} {{ collapseHeader }}</span>
        <div>
          {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }}
          {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }} {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaButton from '../va-button/VaButton'
import VaCollapse from './VaCollapse.vue'

export default {
  components: {
    VaCollapse,
    VaButton,
  },
  data () {
    return {
      collapseHeader: 'Expand This Block',
      collapseContent: 'Collapse content',
    }
  },
}
</script>
