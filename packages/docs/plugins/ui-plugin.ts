// @ts-nocheck

import Vue from 'vue'
import { ColorThemePlugin } from '../../ui/src/services/ColorThemePlugin'
import { DropdownPopperPlugin } from '../../ui/src/components/vuestic-components/va-dropdown/dropdown-popover-subplugin.js'
import Router from 'vue-router'
import VaDataTable from '../../ui/src/components/vuestic-components/va-data-table/VaDataTable.vue'

Vue.use(ColorThemePlugin,
    {
      themes: {
        primary: '#2C82E0',
        secondary: '#f4f8fa',
        dark: '#1B1A1F',
      },
    })
Vue.use(DropdownPopperPlugin)
Vue.use(Router)
Vue.component('va-data-table', VaDataTable)