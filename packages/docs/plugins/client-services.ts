// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import { ColorThemePlugin } from '../../ui/src/services/ColorThemePlugin'
import { ThemeName, COLOR_THEMES } from '../theme-config'

Vue.use(ColorThemePlugin,
  {
    themes: COLOR_THEMES[ThemeName.DEFAULT],
  })
Vue.use(Router)
