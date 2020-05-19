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
          name: 'breadcrumbs',
          displayName: 'menu.breadcrumbs',
        },
        {
          name: 'badge',
          displayName: 'menu.badge',
        },
        {
          name: 'fileUpload',
          displayName: 'menu.fileUpload',
        },
        {
          name: 'modal',
          displayName: 'menu.modal',
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
          displayName: 'menu.slider',
        },
        {
          name: 'switch',
          displayName: 'menu.switch',
        },
        {
          name: 'tabs',
          displayName: 'menu.tabs',
        },
      ],
    },
  ],
}
