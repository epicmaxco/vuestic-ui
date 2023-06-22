<template>
  <div
    id="docsearch"
    class="docsearch-container"
  />
</template>

<script lang="ts" setup>
import docsearch from '@docsearch/js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { getTextColor, setHSLAColor, colors, getColor } = useColors()

const placeholderColor = computed(() => setHSLAColor(getColor(getTextColor(colors.backgroundElement)), { a: 0.7 }))

const getUrlObject = (fullPath: string): {pathname: string, hash: string} => {
  // Algolia sends us urls like this: https://ui.vuestic.dev/ui-elements/table
  // But vue router doesn't like full urls, so we need to split it apart.
  const { pathname, hash } = new URL(fullPath)

  if (!pathname) {
    // TODO Report to Sentry.
  }

  return { pathname, hash }
}

onMounted(() => {
  const navigateToPath = ({ pathname, hash }: {pathname: string, hash: string}) => {
    router.push({ path: pathname, hash })
  }

  docsearch({
    container: '#docsearch',
    appId: 'DVNV64RN9R',
    indexName: 'vuestic',
    apiKey: '8b7272f0ee34e6e6c6e1b257c8fc054d',
    disableUserPersonalization: true,
    // absolutely kekw but docsearch is based on React, so we simulate React.createElement()
    // @ts-ignore
    hitComponent ({ hit, children }) {
      const url = getUrlObject(hit.url)

      return {
        type: 'a',
        props: {
          href: `${url.pathname}#${url.hash}`,
          target: '_blank',
          onClick: (event: MouseEvent) => {
            event.preventDefault()
            navigateToPath(url)
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
        navigateToPath(getUrlObject(itemUrl))
      },
    }
  })
})
</script>

<style lang="scss">
@import '@docsearch/css';
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
  z-index: 10000;

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

  @include xs(flex-grow, 0);

  .DocSearch-Button {
    margin-left: 0;
    flex-grow: 1;
    max-width: 20rem;
    border-radius: var(--va-input-border-radius);
    background-color: var(--va-background-element);

    @media screen and (max-width: $break_xs) {
      background: transparent;
      min-width: 2rem;
      padding: 0;
      justify-content: center;
    }
  }

  .DocSearch-Button-Placeholder {
    color: v-bind(placeholderColor);

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
}

.DocSearch-Modal {
  top: 3rem;

  @include md(top, 0);
}
</style>
