<template>
  <form id="search-form">
    <va-input
      id="algolia-search-input"
      v-model="value"
      placeholder="Search..."
      @focus="onFocusHandler('dark', 'block')"
      @blur="onFocusHandler('gray', 'none')"
    >
      <va-icon
        slot="prepend"
        class="search-icon"
        name="search"
        :color="color"
        size="100%"
      />
    </va-input>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Search',
})
export default class Search extends Vue {
  value = ''
  color = 'gray'

  onFocusHandler (colorValue: string, displayValue: string): void {
    this.color = colorValue
    const el: HTMLElement | null = document.querySelector('.ds-dropdown-menu')
    if (el) { el.style.display = displayValue }
  }

  initialize () {
    Promise.all([
      // @ts-ignore
      import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
      // @ts-ignore
      import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css'),
    ]).then(([docsearch]) => {
      docsearch = docsearch.default
      docsearch(Object.assign({
        apiKey: 'be3528055c92da2ea5133b93ed548c6d',
        indexName: 'vuestic',
      }, {
        inputSelector: '#algolia-search-input',
        debug: true,
      }))
    })
  }

  mounted () {
    this.initialize()
  }
}
</script>

<style lang="scss">

@import '../../../../ui/src/components/vuestic-sass/vuestic-styles';

#search-form {
  padding: 1rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .va-input__container {
    background-color: transparent !important;
    border: none;
  }

  .va-input-wrapper__prepend-inner {
    margin: 0;
  }

  .search-icon {
    transition: background-color, 0.2s;
  }

  #algolia-search-input {
    display: block;
    background: none;
    border: none;
    font-family: Source Sans Pro;
    font-size: 100%;
    width: 100%;
    padding-left: 0.2rem;
  }

  .ds-dropdown-menu {
    &::before {
      display: none;
    }

    > div {
      position: fixed;
      border: none;
      box-shadow: 0 2px 8px rgba(122, 139, 173, 0.2);
      border-radius: 4px;
      padding: 0;

      .ds-suggestion {
        .algolia-docsearch-suggestion {
          padding: 0;
        }

        &:first-child {
          .algolia-docsearch-suggestion--category-header {
            border-top: none;
          }
        }

        .algolia-docsearch-suggestion--category-header {
          padding: 0.25rem 1rem;
          border-bottom: none;
          border-top: 1px solid $prism-background;

          &-lvl0 {
            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: bold;
            font-size: 10px;
            line-height: 14px;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            color: $default-gray;

            .algolia-docsearch-suggestion--highlight {
              box-shadow: inset 0 -2px 0 0 rgba(44, 130, 224, 0.1);
            }
          }
        }

        .algolia-docsearch-suggestion--wrapper {
          padding-top: 0;
        }

        .algolia-docsearch-suggestion--subcategory-column {
          display: none;
        }

        .algolia-docsearch-suggestion--content {
          padding: 0.5rem 1rem;
          float: left;
          width: 100%;

          &::before {
            display: none;
          }

          .algolia-docsearch-suggestion--title {
            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 20px;
            color: #1b1a1f;

            .algolia-docsearch-suggestion--highlight {
              padding: 0;
              color: #2c82e0;
              background: rgba(44, 130, 224, 0.1);
            }
          }

          .algolia-docsearch-suggestion--text {
            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: normal;
            font-size: 15px;
            line-height: 20px;
            color: $default-gray;

            .algolia-docsearch-suggestion--highlight {
              color: #2c82e0;
              background: rgba(44, 130, 224, 0.1);
              box-shadow: none;
            }
          }
        }
      }

      .ds-cursor {
        .algolia-docsearch-suggestion--content {
          background-color: $prism-background;
        }
      }

      .algolia-docsearch-footer {
        margin: 1rem;
      }
    }
  }
}
</style>
