// @ts-nocheck

import Vue from 'vue'
import { ColorThemePlugin } from '../../ui/src/services/ColorThemePlugin'
import { DropdownPopperPlugin } from '../../ui/src/components/vuestic-components/va-dropdown/dropdown-popover-subplugin.js'
import Router from 'vue-router'
import VaDataTable from '../../ui/src/components/vuestic-components/va-data-table/VaDataTable.vue'

Vue.use(ColorThemePlugin)
Vue.use(DropdownPopperPlugin)
Vue.use(Router)
Vue.component('va-data-table', VaDataTable)