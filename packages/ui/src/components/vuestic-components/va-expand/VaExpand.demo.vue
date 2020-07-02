<template>
  <VbDemo>
    <VbCard title="Default">
      <va-expand style="width: 400px;">
        <span slot="header">{{ expandHeader }}</span>
        <div>
          {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>

    <VbCard title="Layers">
      <va-expand style="width: 400px;">
        <span slot="header">{{ expandHeader }}</span>
        <div>
          <va-expand style="width: 380px;">
            <span slot="header">{{ expandHeader }}</span>
            <div>
              {{ expandContent }}
            </div>
          </va-expand>
                    <va-expand style="width: 380px;">
            <span slot="header">{{ expandHeader }}</span>
            <div>
              {{ expandContent }}
            </div>
          </va-expand>
                    <va-expand style="width: 380px;">
            <span slot="header">{{ expandHeader }}</span>
            <div>
              {{ expandContent }}
            </div>
          </va-expand>
        </div>
      </va-expand>
    </VbCard>

    <VbCard title="Custom header">
      <va-expand
        style="width: 400px;"
        custom-header
      >
        <va-button
          slot="header"
          style="width: 100%;"
        >
          {{ expandHeader }}
        </va-button>
        <div>
          {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>
    <VbCard title="With background">
      <va-expand
        style="width: 400px;"
        with-background
      >
        <span slot="header">{{ expandHeader }}</span>
        <div>
          {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>
    <VbCard title="Is open default">
      <va-expand
        style="width: 400px;"
        is-open-default
      >
        <span slot="header">{{ expandHeader }}</span>
        <div>
          {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>
    <VbCard title="looooong texts">
      <va-expand
        style="width: 400px;"
        default-value
      >
        <span slot="header">{{ expandHeader }} {{ expandHeader }} {{ expandHeader }} {{ expandHeader }} {{ expandHeader }} {{ expandHeader }} {{ expandHeader }} {{ expandHeader }} {{ expandHeader }} {{ expandHeader }}</span>
        <div>
          {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }}
          {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }} {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaButton from '../va-button/VaButton'
import VaExpand from './VaExpand.vue'

export default {
  components: {
    VaExpand,
    VaButton,
  },
  data () {
    return {
      expandHeader: 'Expand This Block',
      expandContent: 'Expand content',
    }
  },
}
</script>
