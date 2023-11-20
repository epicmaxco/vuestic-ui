<template>
  <vb-demo>
    <va-button
        size="small"
        color="info"
        @click="loading = !loading"
      >
        {{ loading ? 'Stop loading' : 'Start loading ' }}
    </va-button>
    <vb-card width="400px" title="Default">
      <va-inner-loading :loading="loading">
        <va-card>
          <va-card-title text-color="primary">
            Epicmax
            <va-spacer />
            <va-button icon="email" />
            <va-button icon="local_phone" />
          </va-card-title>

          <va-card-content>
            <p>NO BUREAUCRACY. NO MIDDLEMEN. NO WASTE OF TIME.</p>

            <p>
              Epicmax is a team of talented people ready to care about your product.
              We love coding. We love beautiful design. We love doing our job better than possible.
              Every product we craft is a challenge we are excited about.
            </p>
          </va-card-content>
        </va-card>
      </va-inner-loading>
    </vb-card>

    <vb-card width="400px" title="Custom loader slot">
      <va-inner-loading :loading="loading">
        <va-card>
          <va-card-title text-color="primary">
            Epicmax
            <va-spacer />
            <va-button icon="email" />
            <va-button icon="local_phone" />
          </va-card-title>

          <va-card-content>
            <p>NO BUREAUCRACY. NO MIDDLEMEN. NO WASTE OF TIME.</p>

            <p>
              Epicmax is a team of talented people ready to care about your product.
              We love coding. We love beautiful design. We love doing our job better than possible.
              Every product we craft is a challenge we are excited about.
            </p>
          </va-card-content>
        </va-card>
        <template #loading>
          <div class="custom-loader__container">
            <va-progress-bar indeterminate />
          </div>
        </template>
      </va-inner-loading>
    </vb-card>
  </vb-demo>
</template>

<script>
import { VaButton } from '../va-button'
import { VaCard, VaCardTitle, VaCardContent } from '../va-card'
import { VaProgressBar } from '../va-progress-bar'
import { VaSpacer } from '../va-spacer'
import { VaInnerLoading } from './index'

export default {
  components: {
    VaButton,
    VaCard,
    VaCardTitle,
    VaCardContent,
    VaProgressBar,
    VaSpacer,
    VaInnerLoading,
  },
  data () {
    return {
      loading: true,
    }
  },
}
</script>

<style scoped lang="scss">
.custom-loader__container {
  width: 100px;
}
</style>
