// @ts-nocheck
import Vue from 'vue'
import VuesticPlugin from '../../ui/src/components/vuestic-plugin'
import Router from 'vue-router'
import { ColorThemePlugin } from '../../ui/src/services/ColorThemePlugin'
import { ThemeName, COLOR_THEMES } from '../themeConfig.ts'
import { DropdownPopperPlugin } from '../../ui/src/components/vuestic-components/va-dropdown/dropdown-popover-subplugin.js'
import VaDataTable from '../../ui/src/components/vuestic-components/va-data-table/VaDataTable.vue'
Vue.use(ColorThemePlugin,
  {
    themes: COLOR_THEMES[ThemeName.DEFAULT],
  })

Vue.use(DropdownPopperPlugin)
Vue.use(Router)
Vue.component('va-data-table', VaDataTable)
Vue.use(VuesticPlugin)
