// @ts-nocheck

import Vue from 'vue'
import { ColorThemePlugin } from '../../ui/src/services/ColorThemePlugin'
import { DropdownPopperPlugin } from '../../ui/src/components/vuestic-components/va-dropdown/dropdown-popover-subplugin.js'
import ColorHelpersPlugin from '../../ui/src/components/vuestic-utilities/color-helpers-plugin'
import Router from 'vue-router'

Vue.use(ColorThemePlugin)
Vue.use(DropdownPopperPlugin)
Vue.use(ColorHelpersPlugin)
Vue.use(Router)
