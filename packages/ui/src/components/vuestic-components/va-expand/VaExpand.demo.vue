<template>
  <VbDemo>
    <VbCard title="Default">
      <va-expand
        style="width: 400px;"
        :header="expandHeader"
      >
        <div>
          {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>

    <VbCard title="Default">
      <va-expand
        style="width: 400px;"
        :header="expandHeader"
        solid
      >
        <div>
          {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>

    <VbCard title="Disabled">
      <va-expand
        style="width: 400px;"
        :header="expandHeader"
        disabled
      >
        <div>
          {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>

    <VbCard title="Icon">
      <va-expand
        style="width: 400px;"
        :header="expandHeader"
        icon="home"
      >
        <div>
          {{ expandContent }}
        </div>
      </va-expand>
    </VbCard>

    <VbCard title="Layers">
      <va-expand
        style="width: 400px;"
        :header="expandHeader"
      >
        <div>
          <va-expand
            style="width: 380px;"
            :header="expandHeader"
          >
            <div>
              {{ expandContent }}
            </div>
          </va-expand>
          <va-expand
            style="width: 380px;"
            :header="expandHeader"
          >
            <div>
              {{ expandContent }}
            </div>
          </va-expand>
          <va-expand
            style="width: 380px;"
            :header="expandHeader"
          >
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
      >
        <template slot="header">
          <va-button
            style="width: 100%;"
          >
            {{ expandHeader }}
          </va-button>
        </template>

        <div>
          {{ expandContent }}
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
