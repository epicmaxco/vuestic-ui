<template>
  <div id="docsearch" class="docsearch-container" />
</template>

<script lang="ts" setup>
import docsearch from '@docsearch/js'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()
onMounted(() => {
  const getPathFromAlgoliaResponse = (url: string): string => {
    // sometimes is response we have relative url,
    // so this regexp try to parse absolute url, then try to parse relative url
    const [, pathFromAbsoluteUrl, pathFromRelativeUrl] = /^https.+?\/[a-z]{2}\/(.*)|^\/[a-z]{2}\/(.*)/.exec(url) || []

    return pathFromAbsoluteUrl || pathFromRelativeUrl || ''
  }
  const createPathWithCurrentLocale = (path: string) => `/${locale.value}/${path}`
  const navigateToPath = (path: string) => {
    if (!path.length) {
      return
    }

    router.push({
      path: createPathWithCurrentLocale(path),
    })
  }

  docsearch({
    container: '#docsearch',
    appId: 'DVNV64RN9R',
    indexName: 'vuestic',
    apiKey: 'cd8e70cb466bf6df138543a38c33ea5e',
    // absolutely kekw but docsearch is based on React, so we simulate React.createElement()
    // @ts-ignore
    hitComponent ({ hit, children }) {
      const path = getPathFromAlgoliaResponse(hit.url)
      return {
        type: 'a',
        props: {
          href: createPathWithCurrentLocale(path),
          target: '_blank',
          onClick: (event: MouseEvent) => {
            event.preventDefault()
            navigateToPath(path)
          },
          children,
        },
        // Need to create empty constructor and __v as null.
        __v: null,
        constructor: undefined,
      }
    },
    navigator: { // keyboard navigation
      navigate ({ itemUrl }) {
        const path = getPathFromAlgoliaResponse(itemUrl)
        navigateToPath(path)
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
  --docsearch-modal-background: var(--va-background-primary);
  --docsearch-footer-background: var(--va-background-element);
  --docsearch-hit-background: var(--va-background-element);
  --docsearch-hit-color: var(--va-on-background-element);
  --docsearch-searchbox-focus-background: var(--va-background-element);
  --docsearch-modal-shadow: unset;
  --docsearch-footer-shadow: unset;
  --docsearch-hit-shadow: unset;
  --docsearch-container-background: transparent;
}

.DocSearch-Container {
  z-index: 0;

  &::after,
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &::after {
    background: var(--va-primary);
    opacity: 0.1;
  }

  &::before {
    background: rgba(85, 85, 85, 0.473);
    opacity: 0.8;
  }
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

    @media screen and (max-width: $break_xs) {
      background: transparent;
      min-width: 2rem;
      padding: 0;
      justify-content: center;
    }
  }

  .DocSearch-Button-Placeholder {
    @include md(display, block);
    @include xs(display, none);
  }

  .DocSearch-Button-Keys {
    @include md(display, flex);
    @include xs(display, none);
  }

  .DocSearch-Button-Container {
    svg {
      @include sm(color, var(--va-primary));
    }
  }

  @media screen and (max-width: $break_xs) {
    flex-grow: 0;
  }
}

.DocSearch-Modal {
  top: 3rem;

  @include md(top, 0);
}
</style>
