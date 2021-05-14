import { NavigationRoute } from './NavigationRoute'

export const navigationRoutes: NavigationRoute[] = [
  {
    name: 'introduction',
    displayName: 'menu.introduction',
    meta: {
      iconClass: 'vuestic-iconset-image',
    },
    disabled: true,
    children: [
      {
        name: 'overview',
        displayName: 'menu.overview',
      },
      {
        name: 'roadmap',
        displayName: 'menu.roadmap',
      },
      {
        name: 'browser-support',
        displayName: 'menu.browserSupport',
      },
      // GENERATOR_ADD - introduction
    ],
  },
  {
    name: 'getting-started',
    displayName: 'menu.gettingStarted',
    meta: {
      iconClass: 'vuestic-iconset-image',
    },
    disabled: true,
    children: [
      {
        name: 'installation',
        displayName: 'menu.installation',
      },
      {
        name: 'accessibility-guide',
        displayName: 'menu.accessibilityGuide',
      },
      {
        name: 'configuration-guide',
        displayName: 'menu.configurationGuide',
      },
      // GENERATOR_ADD - gettingStarted
    ],
  },
  {
    name: 'styles',
    displayName: 'menu.styles',
    meta: {
      iconClass: 'vuestic-iconset-image',
    },
    disabled: true,
    children: [
      {
        name: 'grid',
        displayName: 'menu.grid',
      },
      {
        name: 'table',
        displayName: 'menu.table',
      },
      {
        name: 'css-variables',
        displayName: 'menu.cssVariables',
      },
      // GENERATOR_ADD - styles
    ],
  },
  {
    name: 'ui-elements',
    displayName: 'menu.uiElements',
    meta: {
      iconClass: 'vuestic-iconset-ui-elements',
    },
    disabled: true,
    children: [
      {
        category: 'menu.categories.view',
        name: 'avatar',
        displayName: 'menu.avatar',
      },
      {
        name: 'button',
        displayName: 'menu.button',
      },
      {
        name: 'button-group',
        displayName: 'menu.buttonGroup',
      },
      {
        name: 'button-toggle',
        displayName: 'menu.buttonToggle',
      },
      {
        name: 'icon',
        displayName: 'menu.icon',
      },
      {
        name: 'image',
        displayName: 'menu.image',
      },
      {
        name: 'chip',
        displayName: 'menu.chip',
      },
      {
        name: 'alert',
        displayName: 'menu.alert',
      },
      {
        name: 'modal',
        displayName: 'menu.modal',
      },
      {
        category: 'menu.categories.form',
        name: 'form',
        displayName: 'menu.form',
      },
      {
        name: 'switch',
        displayName: 'menu.switch',
      },
      {
        name: 'slider',
        displayName: 'menu.slider',
      },
      {
        name: 'checkbox',
        displayName: 'menu.checkbox',
      },
      {
        name: 'radio',
        displayName: 'menu.radio',
      },
      {
        name: 'option-list',
        displayName: 'menu.optionList',
      },
      {
        name: 'input',
        displayName: 'menu.input',
      },
      {
        name: 'select',
        displayName: 'menu.select',
      },
      {
        name: 'rating',
        displayName: 'menu.rating',
      },
      {
        name: 'file-upload',
        displayName: 'menu.fileUpload',
      },
      // Temporary removed
      // {
      //   name: 'date-picker',
      //   displayName: 'menu.datePicker',
      // },
      {
        category: 'menu.categories.layout',
        name: 'card',
        displayName: 'menu.card',
      },
      {
        name: 'divider',
        displayName: 'menu.divider',
      },
      {
        name: 'list',
        displayName: 'menu.list',
      },
      {
        name: 'collapse',
        displayName: 'menu.collapse',
      },
      {
        name: 'accordion',
        displayName: 'menu.accordion',
      },
      {
        category: 'menu.categories.navigation',
        name: 'pagination',
        displayName: 'menu.pagination',
      },
      {
        name: 'tabs',
        displayName: 'menu.tabs',
      },
      {
        name: 'breadcrumbs',
        displayName: 'menu.breadcrumbs',
      },
      {
        name: 'badge',
        displayName: 'menu.badge',
      },
      // TODO: Color components not released yet
      // {
      //   category: 'menu.categories.color',
      //   name: 'color-picker',
      //   displayName: 'menu.colorPicker',
      // },
      // {
      //   name: 'color-input',
      //   displayName: 'menu.colorInput',
      // },
      // {
      //   name: 'color-slider',
      //   displayName: 'menu.colorSlider',
      // },
      // {
      //   name: 'color-palette',
      //   displayName: 'menu.colorPalette',
      // },
      {
        name: 'navbar',
        displayName: 'menu.navbar',
      },
      {
        name: 'sidebar',
        displayName: 'menu.sidebar',
      },
      {
        name: 'sidebar-item',
        displayName: 'menu.sidebarItem',
      },
      {
        category: 'menu.categories.other',
        name: 'affix',
        displayName: 'menu.affix',
      },
      {
        name: 'hover',
        displayName: 'menu.hover',
      },
      {
        name: 'infinite-scroll',
        displayName: 'menu.infiniteScroll',
      },
      {
        name: 'parallax',
        displayName: 'menu.parallax',
      },
      {
        name: 'backtop',
        displayName: 'menu.backtop',
      },
      {
        name: 'inner-loading',
        displayName: 'menu.innerLoading',
      },
      {
        name: 'app-bar',
        displayName: 'menu.appBar',
      },
      {
        name: 'progress-bar',
        displayName: 'menu.progressBar',
      },
      {
        name: 'progress-circle',
        displayName: 'menu.progressCircle',
      },
      // GENERATOR_ADD - uiElements
    ],
  },
  {
    name: 'contribution',
    displayName: 'menu.contribution',
    children: [
      {
        name: 'documentation-page',
        displayName: 'menu.documentationPage',
      },
      {
        name: 'translation',
        displayName: 'menu.translation',
      },
      {
        name: 'guide',
        displayName: 'menu.guide',
      },
      // GENERATOR_ADD - contribution
    ],
  },
  {
    name: 'services',
    displayName: 'menu.services',
    children: [
      {
        name: 'global-config',
        displayName: 'menu.globalConfig',
      },
      {
        name: 'components-config',
        displayName: 'menu.componentsConfig',
      },
      {
        name: 'icons-config',
        displayName: 'menu.iconsConfig',
      },
      // TODO: next
      // {
      //   name: 'advanced-icons-config',
      //   displayName: 'menu.advancedIconsConfig',
      // },
      {
        name: 'colors-config',
        displayName: 'menu.colorsConfig',
      },
      // GENERATOR_ADD - services
    ],
  },
]
