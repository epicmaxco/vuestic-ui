<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import VaTabsItemsMixin from './VaTabsItemsMixin'

@Component({
  name: 'VaTabsItems',
})
export default class VaTabsItems extends Mixins(VaTabsItemsMixin) {}
</script>
