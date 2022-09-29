<template>
  <div id="docsearch" />
</template>

<script lang="ts" setup>
import docsearch from '@docsearch/js'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()
onMounted(() => {
  docsearch({
    container: '#docsearch',
    appId: 'DVNV64RN9R',
    indexName: 'vuestic',
    apiKey: 'cd8e70cb466bf6df138543a38c33ea5e',
    // absolutely kekw but docsearch is based on React, so we simulate React.createElement()
    // @ts-ignore
    hitComponent ({ hit, children }) {
      const url = new URL(hit.url)

      url.hostname = window.location.hostname

      return {
        type: 'a',
        props: {
          href: url,
          target: '_blank',
          onClick: (event: MouseEvent) => {
            event.preventDefault()
            router.push({
              path: hit.url.replace(/^https.*\/[a-z]{2}\//, `/${locale.value}/`),
            })
          },
          children,
        },
        // Need to create empty contructor and __v as null.
        __v: null,
        constructor: undefined,
      }
    navigator: { // keyboard navigation
      navigate ({ itemUrl }) {
        router.push({
          path: itemUrl.replace(/^https.*\/[a-z]{2}\//, `/${locale.value}/`),
        })
      },
    },
  })
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
