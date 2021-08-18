<template>
  <div class="row row">
    <div class="flex md6 lg4">
      <va-card>
        <va-card-title>
          {{ $t('api.VaCard.examples.actions.firstTitle') }}
        </va-card-title>
        <va-card-actions align="between">
          <va-button>
            {{ $t('all.Action') }} 1
          </va-button>
          <va-button>
            {{ $t('all.Action') }} 2
          </va-button>
        </va-card-actions>
      </va-card>
    </div>
    <div class="flex md6 lg4">
      <va-card>
        <va-card-title>
          {{ $t('api.VaCard.examples.actions.secondTitle') }}
        </va-card-title>
        <va-card-actions align="stretch" vertical>
          <va-button>
            {{ $t('api.VaCard.examples.actions.firstButton') }}
          </va-button>
          <va-button>
            {{ $t('api.VaCard.examples.actions.secondButton') }}
          </va-button>
        </va-card-actions>
      </va-card>
    </div>
  </div>
</template>

<script>
import VaCardActions from 'vuestic-ui/src/components/va-card/VaCardActions'

export default {
  components: { VaCardActions },
}
</script>
