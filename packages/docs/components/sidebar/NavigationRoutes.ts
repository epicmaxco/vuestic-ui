import { TranslationString } from '../../../ui/src/services/api-docs/ManualApiOptions'

export type NavigationRoute = {
  name: string,
  displayName: TranslationString,
  meta?: {
    iconClass: string,
  },
  disabled?: boolean,
  children?: NavigationRoute[],
}

export type NavigationScheme = {
  root: NavigationRoute,
  routes: NavigationRoute[],
}

export const navigationRoutes: NavigationScheme = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'ui',
      displayName: 'menu.uiElements',
      meta: {
        iconClass: 'vuestic-iconset-ui-elements',
      },
      disabled: true,
      children: [
        {
          name: 'affix',
          displayName: 'menu.affix',
        },
        {
          name: 'form',
          displayName: 'menu.forms',
        },
        {
          name: 'modals',
          displayName: 'menu.modals',
        },
        {
          name: 'pagination',
          displayName: 'menu.pagination',
        },
        {
          name: 'rating',
          displayName: 'menu.rating',
        },
        {
          name: 'slider',
          displayName: 'menu.sliders',
        },
        {
          name: 'tabs',
          displayName: 'menu.tabs',
        },
      ],
    },
  ],
}
