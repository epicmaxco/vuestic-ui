export type NavigationRoute = {
  name: string;
  category?: `menu.categories.${string}`;
  displayName: `menu.${string}`;
  meta?: {
    iconClass?: string;
    badge?: "wip" | "new" | "updated";
  };
  disabled?: boolean;
  children?: NavigationRoute[];
  path?: string;
};

export const navigationRoutes: NavigationRoute[] = [
  {
    name: "introduction",
    displayName: "menu.introduction",
    meta: {
      iconClass: "vuestic-iconset-image",
    },
    disabled: true,
    children: [
      {
        name: "overview",
        displayName: "menu.overview",
      },
      {
        name: "team",
        displayName: "menu.team",
      },
      {
        name: "roadmap",
        displayName: "menu.roadmap",
      },
      {
        name: "browser-support",
        displayName: "menu.browserSupport",
      },
      {
        name: "accessibility-guide",
        displayName: "menu.accessibilityGuide",
      },
      // GENERATOR_ADD - introduction
    ],
  },
  {
    name: "getting-started",
    displayName: "menu.gettingStarted",
    meta: {
      iconClass: "vuestic-iconset-image",
    },
    disabled: true,
    children: [
      {
        name: "installation",
        displayName: "menu.installation",
      },
      {
        name: "configuration-guide",
        displayName: "menu.configurationGuide",
      },
      {
        name: "tree-shaking",
        displayName: "menu.treeShaking",
      },
      {
        name: "nuxt",
        displayName: "menu.nuxt",
      },
      {
        name: "ssr-guide",
        displayName: "menu.ssrGuide",
      },
      {
        name: "kitchensink",
        displayName: "menu.kitchensink",
        meta: {
          badge: "new",
        },
      },
      {
        name: 'web-components',
        displayName: 'menu.webComponents',
        meta: {
          badge: 'new',
        },
      },
      // GENERATOR_ADD - gettingStarted
    ],
  },
  {
    name: "styles",
    displayName: "menu.styles",
    meta: {
      iconClass: "vuestic-iconset-image",
    },
    disabled: true,
    children: [
      {
        name: "colors",
        displayName: "menu.colors",
        meta: {
          badge: "updated",
        },
      },
      {
        name: "css-variables",
        displayName: "menu.cssVariables",
      },
      {
        name: "typography",
        displayName: "menu.typography",
      },
      {
        name: "grid",
        displayName: "menu.grid",
      },
      {
        name: 'tailwind',
        displayName: 'menu.tailwind',
        meta: {
          badge: 'new',
        },
      },
      {
        name: "smart-helpers",
        displayName: "menu.smartHelpers",
        meta: {
          badge: "new",
        },
      },
      {
        name: "reset",
        displayName: "menu.reset",
      },
      // GENERATOR_ADD - styles
    ],
  },
  {
    name: "ui-elements",
    displayName: "menu.uiElements",
    meta: {
      iconClass: "vuestic-iconset-ui-elements",
    },
    disabled: true,
    children: [
      {
        category: "menu.categories.view",
        name: "avatar",
        displayName: "menu.avatar",
      },
      {
        name: "badge",
        displayName: "menu.badge",
      },
      {
        name: "button",
        displayName: "menu.button",
        meta: {
          badge: "updated",
        },
      },
      {
        name: "button-group",
        displayName: "menu.buttonGroup",
      },
      {
        name: "button-toggle",
        displayName: "menu.buttonToggle",
      },
      {
        name: "button-dropdown",
        displayName: "menu.buttonDropdown",
      },
      {
        name: "icon",
        displayName: "menu.icon",
      },
      {
        name: "image",
        displayName: "menu.image",
      },
      {
        name: "carousel",
        displayName: "menu.carousel",
      },
      {
        name: "chip",
        displayName: "menu.chip",
      },
      {
        name: "alert",
        displayName: "menu.alert",
      },
      {
        name: "modal",
        displayName: "menu.modal",
      },
      {
        name: "table",
        displayName: "menu.table",
      },
      {
        name: "data-table",
        displayName: "menu.dataTable",
      },
      {
        category: "menu.categories.form",
        name: "form",
        displayName: "menu.form",
      },
      {
        name: "switch",
        displayName: "menu.switch",
      },
      {
        name: "slider",
        displayName: "menu.slider",
      },
      {
        name: "checkbox",
        displayName: "menu.checkbox",
      },
      {
        name: "counter",
        displayName: "menu.counter",
      },
      {
        name: "radio",
        displayName: "menu.radio",
      },
      {
        name: "option-list",
        displayName: "menu.optionList",
      },
      {
        name: "input",
        displayName: "menu.input",
      },
      {
        name: "select",
        displayName: "menu.select",
      },
      {
        name: "rating",
        displayName: "menu.rating",
      },
      {
        name: "file-upload",
        displayName: "menu.fileUpload",
      },
      {
        name: "popover",
        displayName: "menu.popover",
      },
      {
        name: "date-picker",
        displayName: "menu.datePicker",
      },
      {
        name: "date-input",
        displayName: "menu.dateInput",
      },
      {
        name: "time-picker",
        displayName: "menu.timePicker",
      },
      {
        name: "time-input",
        displayName: "menu.timeInput",
      },
      {
        name: "color-input",
        displayName: "menu.colorInput",
      },
      {
        category: 'menu.categories.layout',
        name: 'aspect-ratio',
        displayName: 'menu.aspectRatio',
        meta: {
          badge: 'new',
        },
      },
      {
        name: "skeleton",
        displayName: "menu.skeleton",
        meta: {
          badge: "new",
        }
      },
      {
        name: "card",
        displayName: "menu.card",
      },
      {
        name: "divider",
        displayName: "menu.divider",
      },
      {
        name: "list",
        displayName: "menu.list",
      },
      {
        name: "split",
        displayName: "menu.split",
        meta: {
          badge: "new",
        },
      },
      {
        name: "collapse",
        displayName: "menu.collapse",
      },
      {
        name: "accordion",
        displayName: "menu.accordion",
      },
      {
        name: "scroll-container",
        displayName: "menu.scrollContainer",
        meta: {
          badge: "new",
        },
      },
      {
        category: "menu.categories.navigation",
        name: "pagination",
        displayName: "menu.pagination",
      },
      {
        name: "tabs",
        displayName: "menu.tabs",
      },
      {
        name: "breadcrumbs",
        displayName: "menu.breadcrumbs",
      },
      {
        name: "navbar",
        displayName: "menu.navbar",
      },
      {
        name: "sidebar",
        displayName: "menu.sidebar",
      },
      {
        name: "sidebar-item",
        displayName: "menu.sidebarItem",
      },
      {
        category: "menu.categories.other",
        name: "affix",
        displayName: "menu.affix",
      },
      {
        name: "hover",
        displayName: "menu.hover",
      },
      {
        name: "infinite-scroll",
        displayName: "menu.infiniteScroll",
      },
      {
        name: "parallax",
        displayName: "menu.parallax",
      },
      {
        name: "backtop",
        displayName: "menu.backtop",
      },
      {
        name: "inner-loading",
        displayName: "menu.innerLoading",
      },
      {
        name: "app-bar",
        displayName: "menu.appBar",
      },
      {
        name: "progress-bar",
        displayName: "menu.progressBar",
      },
      {
        name: "progress-circle",
        displayName: "menu.progressCircle",
      },
      {
        name: "toast",
        displayName: "menu.toast",
      },
      {
        name: "virtual-scroller",
        displayName: "menu.virtualScroller",
        meta: {
          badge: "new",
        },
      },
      // TODO: Color components not released yet
      // {
      //   category: 'menu.categories.color',
      //   name: 'color-picker',
      //   displayName: 'menu.colorPicker',
      // },
      // {
      //   name: 'color-slider',
      //   displayName: 'menu.colorSlider',
      // },
      {
        name: "color-palette",
        displayName: "menu.colorPalette",
      },
      {
        name: "spacer",
        displayName: "menu.spacer",
      },
      {
        name: "dropdown",
        displayName: "menu.dropdown",
      },
      {
        name: "tree-view",
        displayName: "menu.treeView",
        meta: {
          badge: "new",
        },
      },
      // GENERATOR_ADD - uiElements
    ],
  },
  {
    name: "contribution",
    displayName: "menu.contribution",
    children: [
      {
        name: "guide",
        displayName: "menu.guide",
      },
      {
        name: "ui-element-guide",
        displayName: "menu.uiElementGuide",
      },
      {
        name: "documentation-page",
        displayName: "menu.documentationPage",
      },
      {
        name: "translation",
        displayName: "menu.translation",
      },
      {
        name: "tree-shaking-requirements",
        displayName: "menu.treeShakingRequirements",
      },
      // GENERATOR_ADD - contribution
    ],
  },
  {
    name: "services",
    displayName: "menu.services",
    children: [
      {
        name: "global-config",
        displayName: "menu.globalConfig",
      },
      {
        name: "components-config",
        displayName: "menu.componentsConfig",
        meta: {
          badge: "updated",
        },
      },
      {
        name: "icons-config",
        displayName: "menu.iconsConfig",
      },
      // TODO: next
      // {
      //   name: 'advanced-icons-config',
      //   displayName: 'menu.advancedIconsConfig',
      // },
      {
        name: "colors-config",
        displayName: "menu.colorsConfig",
      },
      {
        name: "colors-classes",
        displayName: "menu.colorsClasses",
        meta: {
          badge: 'new',
        }
      },
      {
        name: "breakpoints",
        displayName: "menu.breakpoints",
        meta: {
          badge: "new",
        },
      },
      {
        name: "i18n",
        displayName: "menu.i18n",
        meta: {
          badge: "new",
        },
      },
      // GENERATOR_ADD - services
    ],
  },
  {
    name: "extensions",
    displayName: "menu.extensions",
    meta: {
      iconClass: "vuestic-iconset-image",
    },
    disabled: true,
    children: [
      {
        name: "ag-grid",
        displayName: "menu.agGrid",
      },
      // GENERATOR_ADD - extensions
    ],
  },
];
