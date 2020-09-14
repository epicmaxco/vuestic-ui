<template>
  <VbDemo>
    <VbCard title="Sidebar" style="width: 100%; height: 80%; background-color: #f1f1f1;">
      <div style="display: block; position: relative; width: 40rem; height: 90%; background: linear-gradient(45deg, grey, transparent);">
        <va-app-bar>
        <va-button icon="home" :color="color" outline :round="false">
        </va-button>
        <div>
          GG
        </div>
        <va-spacer />
        <va-button :color="color">
          GG
        </va-button>
        <va-app-bar-section>
          LL
        </va-app-bar-section>
        </va-app-bar>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaAppBar from '../va-app-bar/VaAppBar'
import VaButton from '../va-button/VaButton'
import VaSpacer from '../va-spacer/VaSpacer'
import VaAppBarSection from './VaAppBarSection'

export default {
  components: {
    VaAppBar,
    VaButton,
    VaSpacer,
    VaAppBarSection,
  },
  data () {
    return {
      color: '#fff',
    }
  },
}
</script>
