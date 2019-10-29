<template>
  <div class="example">
    <va-button @click="useDefaultTheme" color="gray">Use default theme</va-button>
    <va-button @click="useTheme1" color="primary">Use primary theme</va-button>
    <va-button @click="useTheme2" color="dark">Use dark theme</va-button>
  </div>
</template>

<script>
  import VaButton from '../../../src/components/vuestic-components/va-button/VaButton'
  import { ContextPluginMixin } from '../../../src/components/context-test/context-provide/ContextPlugin'
  import { clearStorageContextPluginOptions, setInStorageContextPluginOptions } from '../storageHelpers';

  export default {
    components: { VaButton },
    mixins: [ContextPluginMixin],
    data () {
      return {
        count: 0
      }
    },
    methods: {
      useDefaultTheme () {
        clearStorageContextPluginOptions()

        this.resetPage()
      },
      useTheme1 () {
        const config = {
          VaBadge: {
            color: 'primary',
            textColor: 'white',
          },
          VaBreadcrumbs: {
            color: 'primary',
            separator: '⎇',
          },
          VaAvatar: {
            color: 'primary',
            square: true,
          }
        };

        setInStorageContextPluginOptions(config)

        this.resetPage()
      },
      useTheme2 () {
        const config = {
          VaBadge: {
            color: 'dark',
            textColor: 'gray'
          },
          VaBreadcrumbs: {
            color: 'dark',
            separator: '➤',
          },
          VaAvatar: {
            color: 'dark',
            size: 'large',
          }
        };

        setInStorageContextPluginOptions(config)

        this.resetPage()
      },
      resetPage () {
        this.$router.go(0)
      },
    }
  }
</script>
