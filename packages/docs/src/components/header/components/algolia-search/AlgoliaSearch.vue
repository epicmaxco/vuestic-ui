<template>
  <div id="docsearch" />
</template>

<script lang="ts">
import docsearch from '@docsearch/js'
import { onMounted, defineComponent } from 'vue'
import { __DEV__ } from 'vuestic-ui/src/utils/global-utils'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AlgoliaSearch',
  setup () {
    const { locale } = useI18n()

    onMounted(() => {
      const changeUrlToLocalhost: Parameters<typeof docsearch>[0]['transformItems'] = (items) => items.map((item) => ({
        ...item,
        url: item.url.replace(/^https.*\/en/, `${window.location.origin}/${locale.value}`),
      }))
      const transformItems = __DEV__ ? changeUrlToLocalhost : undefined

      docsearch({
        container: '#docsearch',
        appId: 'DVNV64RN9R',
        indexName: 'vuestic',
        apiKey: 'cd8e70cb466bf6df138543a38c33ea5e',
        transformItems,
      })
    })
  },
})
</script>

<style lang="scss">
@import '@docsearch/css';
@import '~vuestic-ui/src/styles/index.scss';
@import '@/assets/smart-grid.scss';

:root {
  --docsearch-primary-color: var(--va-primary);
  --docsearch-searchbox-shadow: inset 0 0 0 var(--va-input-border-width) var(--va-primary);
  --docsearch-text-color: var(--va-secondary);
}

#docsearch {
  flex-grow: 1;
  display: flex;

  .DocSearch-Button {
    margin-left: 0;
    flex-grow: 1;
    max-width: 320px;
    border-radius: var(--va-input-border-radius);
    background-color: var(--va-input-wrapper-background);
  }

  .DocSearch-Button-Placeholder {
    @media (max-width: 768px) {
      display: block;
    }

    @media (max-width: 480px) {
      display: block;
    }
  }

  .DocSearch-Button-Keys {
    @media (max-width: 768px) {
      display: flex;
    }

    @include xs(display, none);
  }
}
</style>
