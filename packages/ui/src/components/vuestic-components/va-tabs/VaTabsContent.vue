<script lang="ts">
import { h, VNode } from 'vue'
import { Vue, Options } from 'vue-class-component'
import { filterSlots } from './tabsUtils'

@Options({
  name: 'VaTabsContent',
})
export default class VaTabsContent extends Vue {
  render () {
    // todo fix filter for non VaTabs elements
    // filterSlots((this as any).$slots.default(), (n: VNode | any) => typeof n.type === 'string'),
    // Should render only html markup mapped to selected tab
    // ATM renders all content that is not tabs
    return h(
      'div', {},
      // filterSlots((this as any).$slots.default(), (n: VNode | any) => typeof n.type === 'string'),
    )
  }
}
</script>
