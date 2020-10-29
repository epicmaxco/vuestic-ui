<script lang="ts">
import { h, VNode, VNodeArrayChildren } from 'vue'
import { Vue, Options } from 'vue-class-component'
import { filterSlots } from './tabsUtils'

function filterTabs (children: VNodeArrayChildren): any {
  const result: any[] = []
  children.forEach((n: any) => {
    if (Array.isArray(n.children)) { n.children = filterTabs(n.children); result.push(n) }
    if (n.type.name === 'VaTab') { result.push(n) }
  })
  console.log(result)
  return result
}

@Options({
  name: 'VaTabsItems',
})
export default class VaTabsItems extends Vue {
  render () {
    return h(
      'div',
      {
        class: 'va-tabs__tabs-items',
      },
      filterSlots((this as any).$slots.default(), (n: VNode | any) => n.type.name === 'VaTab'),
    )
  }
}
</script>
