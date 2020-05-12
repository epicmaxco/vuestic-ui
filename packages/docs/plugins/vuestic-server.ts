import Vue from 'vue'
import VaContent from '../../ui/src/components/vuestic-components/va-content/VaContent.vue'
import VaAffix from '../../ui/src/components/vuestic-components/va-affix/VaAffix.vue'

Vue.use({
  install (Vue) {
    Vue.component(VaContent.name, VaContent)
    Vue.component('va-affix', VaAffix)
  },
})
