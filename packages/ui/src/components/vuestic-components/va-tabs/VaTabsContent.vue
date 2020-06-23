<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'VaTabsContent',
})
export default class VaTabsContent extends Vue {
  render (createElement: any) {
    // Should render only html markup mapped to selected tab
    // ATM renders all content that is not tabs
    return createElement(
      'div', (this as any).$slots.default.filter((e: any) => {
        if (e.componentOptions) {
          return e.componentOptions.Ctor.options.name !== 'VaTab'
        }
        return true
      }),
    )
  }
}
</script>
