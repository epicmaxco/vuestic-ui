<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component({
  name: 'VaTabsItems',
})
export default class VaTabsItems extends Vue {
  render (createElement: CreateElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'va-tabs__tabs-items',
        },
      },
      (this as any).$slots.default.filter((e: any) => {
        if (e.componentOptions) {
          return e.componentOptions.Ctor.options.name === 'VaTab'
        }
        return false
      }),
    )
  }
}
</script>
