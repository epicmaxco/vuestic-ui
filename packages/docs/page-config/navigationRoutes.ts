import { navigationBadge, type NavigationBadge } from "../utils/navigation/badge";

export type NavigationRoute = {
  name: string;
  category?: string;
  displayName: string;
  meta?: {
    iconClass?: string;
    badge?: NavigationBadge;
  };
  disabled?: boolean;
  children?: NavigationRoute[];
  path?: string;
};

export const navigationRoutes: NavigationRoute[] = [
  {
    name: "introduction",
    displayName: "Introduction",
    disabled: true,
    children: [
      {
        name: "overview",
        displayName: "Overview",
      },
      {
        name: "team",
        displayName: "Meet The Team",
      },
      {
        name: "roadmap",
        displayName: "Roadmap",
      },
      {
        name: "browser-support",
        displayName: "Browser Support",
      },
      {
        name: "accessibility-guide",
        displayName: "Accessibility Guide",
      },
      {
        name: "change-log",
        displayName: "Changelog",
      },
    ],
  },
  {
    name: "getting-started",
    displayName: "Getting Started",
    disabled: true,
    children: [
      {
        name: "installation",
        displayName: "Installation",
      },
      {
        name: "configuration-guide",
        displayName: "Configuration Guide",
      },
      {
        name: "tree-shaking",
        displayName: "Tree Shaking",
        meta: {
          badge: navigationBadge.updated('1.9.9'),
        }
      },
      {
        name: "nuxt",
        displayName: "Nuxt",
      },
      {
        name: "ssr-guide",
        displayName: "SSR",
      },
      {
        name: "kitchensink",
        displayName: "Kitchen Sink",
      },
      {
        name: 'web-components',
        displayName: 'Web Components',
        meta: {
          badge: navigationBadge.new('1.6.0'),
        },
      },
      {
        name: 'testing',
        displayName: 'Testing',
        meta: {
          badge: navigationBadge.new('1.6.0'),
        },
      },
    ],
  },
  {
    name: "styles",
    displayName: "Styles",
    disabled: true,
    children: [
      {
        name: "colors",
        displayName: "Colors",
      },
      {
        name: "css-variables",
        displayName: "CSS Variables",
      },
      {
        name: "typography",
        displayName: "Typography",
      },
      {
        name: "grid",
        displayName: "Grid",
      },
      {
        name: 'tailwind',
        displayName: 'Tailwind Integration',
        meta: {
          badge: navigationBadge.new('1.6.0'),
        },
      },
      {
        name: "smart-helpers",
        displayName: "Smart Helpers",
      },
      {
        name: "reset",
        displayName: "CSS Reset",
      },
    ],
  },
  {
    name: 'composables',
    displayName: 'Composables',
    disabled: true,
    children: [
      {
        name: 'input-mask',
        displayName: 'Input Mask',
        meta: {
          badge: navigationBadge.new('1.10.0'),
        },
      },
      {
        name: 'sticky-table-headers',
        displayName: 'Sticky Table Headers',
        meta: {
          badge: navigationBadge.new('1.10.0'),
        },
      }
    ]
  },
  {
    name: "ui-elements",
    displayName: "UI Elements",
    disabled: true,
    children: [
      {
        category: "View",
        name: "avatar",
        displayName: "Avatar",
      },
      {
        name: "badge",
        displayName: "Badge",
      },
      {
        name: "button",
        displayName: "Button",
      },
      {
        name: "button-group",
        displayName: "Button Group",
      },
      {
        name: "button-toggle",
        displayName: "Button Toggle",
      },
      {
        name: "button-dropdown",
        displayName: "Button Dropdown",
      },
      {
        name: "icon",
        displayName: "Icon",
      },
      {
        name: "image",
        displayName: "Image",
        meta: {
          badge : navigationBadge.updated('1.6.0'),
        }
      },
      {
        name: "carousel",
        displayName: "Carousel",
      },
      {
        name: "carouselv2",
        displayName: "Carousel v2",
        meta: {
          badge: navigationBadge.new('1.10.0'),
        }
      },
      {
        name: "chip",
        displayName: "Chip",
      },
      {
        name: "alert",
        displayName: "Alert",
      },
      {
        name: "modal",
        displayName: "Modal",
      },
      {
        name: "table",
        displayName: "Table",
      },
      {
        name: "data-table",
        displayName: "Data Table",
        meta: {
          badge: navigationBadge.updated('1.8.3'),
        }
      },
      {
        category: "Form",
        name: "form",
        displayName: "Form",
        meta: {
          badge: navigationBadge.updated('1.6.5'),
        }
      },
      {
        name: "form-field",
        displayName: "Form Field",
        meta: {
          badge: navigationBadge.new('1.9.8'),
        }
      },
      {
        name: "switch",
        displayName: "Switch",
      },
      {
        name: "slider",
        displayName: "Slider",
      },
      {
        name: "checkbox",
        displayName: "Checkbox",
        meta: {
          badge: navigationBadge.updated('1.8.0'),
        }
      },
      {
        name: "counter",
        displayName: "Counter",
        meta: {
          badge: navigationBadge.updated('1.8.0'),
        }
      },
      {
        name: "radio",
        displayName: "Radio",
        meta: {
          badge : navigationBadge.updated('1.8.0'),
        }
      },
      {
        name: "option-list",
        displayName: "Option List",
      },
      {
        name: "input",
        displayName: "Input",
        meta: {
          badge: navigationBadge.updated('1.8.0'),
        }
      },
      {
        name: "textarea",
        displayName: "Textarea",
        meta: {
          badge : navigationBadge.new('1.8.0'),
        }
      },
      {
        name: "select",
        displayName: "Select",
        meta: {
          badge : navigationBadge.updated('1.8.0'),
        }
      },
      {
        name: "rating",
        displayName: "Rating",
      },
      {
        name: "file-upload",
        displayName: "File Upload",
      },
      {
        name: "popover",
        displayName: "Popover",
      },
      {
        name: "date-picker",
        displayName: "Date Picker",
      },
      {
        name: "date-input",
        displayName: "Date Input",
        meta: {
          badge : navigationBadge.updated('1.8.0'),
        }
      },
      {
        name: "time-picker",
        displayName: "Time Picker",
      },
      {
        name: "time-input",
        displayName: "Time Input",
        meta: {
          badge : navigationBadge.updated('1.8.0'),
        }
      },
      {
        name: "color-input",
        displayName: "Color Input",
        meta: {
          badge: navigationBadge.updated('1.8.0'),
        }
      },

      {
        category: 'Layout',
        name: 'layout',
        displayName: 'Layout',
        meta: {
          badge: navigationBadge.new('1.8.0'),
        }
      },
      {
        name: 'aspect-ratio',
        displayName: 'Aspect Ratio',
        meta: {
          badge : navigationBadge.new('1.6.0'),
        },
      },
      {
        name: "skeleton",
        displayName: "Skeleton",
        meta: {
          badge : navigationBadge.new('1.6.0'),
        }
      },
      {
        name: "card",
        displayName: "Card",
      },
      {
        name: "divider",
        displayName: "Divider",
      },
      {
        name: "list",
        displayName: "List",
      },
      {
        name: "split",
        displayName: "Split",
      },
      {
        name: "collapse",
        displayName: "Collapse",
        meta: {
          badge: navigationBadge.updated('1.7.0'),
        }
      },
      {
        name: "accordion",
        displayName: "Accordion",
        meta: {
          badge: navigationBadge.updated('1.7.0'),
        }
      },
      {
        name: "scroll-container",
        displayName: "Scroll Container",
      },
      {
        category: "Navigation",
        name: "pagination",
        displayName: "Pagination",
      },
      {
        name: "tabs",
        displayName: "Tabs",
      },
      {
        name: "breadcrumbs",
        displayName: "Breadcrumbs",
      },
      {
        name: "navbar",
        displayName: "Navbar",
      },
      {
        name: "sidebar",
        displayName: "Sidebar",
      },
      {
        name: "sidebar-item",
        displayName: "Sidebar Item",
      },
      {
        name: 'stepper',
        displayName: 'Stepper',
        meta: {
          badge : navigationBadge.updated('1.8.3'),
        }
      },
      {
        name: 'menu',
        displayName: 'Menu',
        meta: {
          badge : navigationBadge.new('1.8.4'),
        }
      },
      {
        name: 'menu-list',
        displayName: 'Menu List',
        meta: {
          badge : navigationBadge.new('1.8.4'),
        }
      },
      {
        category: "Utility",
        name: "value",
        displayName: "Value",
        meta: {
          badge : navigationBadge.new('1.6.0'),
        }
      },
      {
        name: "config",
        displayName: "Config",
        meta: {
          badge : navigationBadge.new('1.6.0 '),
        }
      },
      {
        name: 'sticky-scrollbar',
        displayName: 'Sticky Scrollbar',
        meta: {
          badge : navigationBadge.new('1.9.10'),
        }
      },
      {
        name: "hover",
        displayName: "Hover",
      },
      {
        name: "dropdown",
        displayName: "Dropdown",
        meta: {
          badge : navigationBadge.updated('1.7.0'),
        }
      },
      {
        name: "spacer",
        displayName: "Spacer",
      },

      {
        category: "Other",
        name: "affix",
        displayName: "Affix",
      },
      {
        name: "infinite-scroll",
        displayName: "Infinite Scroll",
      },
      {
        name: "parallax",
        displayName: "Parallax",
      },
      {
        name: "backtop",
        displayName: "Backtop",
      },
      {
        name: "inner-loading",
        displayName: "Inner Loading",
      },
      {
        name: "app-bar",
        displayName: "App Bar",
      },
      {
        name: "progress-bar",
        displayName: "Progress Bar",
      },
      {
        name: "progress-circle",
        displayName: "Progress Circle",
      },
      {
        name: "toast",
        displayName: "Toast",
      },
      {
        name: "confirm",
        displayName: "Confirm",
        meta: {
          badge : navigationBadge.new('1.6.0'),
        }
      },
      {
        name: "virtual-scroller",
        displayName: "Virtual Scroller",
        meta: {
          badge : navigationBadge.new('1.6.0'),
        },
      },
      // TODO: Color components not released yet
      // {
      //   category: 'Color',
      //   name: 'color-picker',
      //   displayName: 'Color Picker',
      // },
      // {
      //   name: 'color-slider',
      //   displayName: 'Color Slider',
      // },
      {
        name: "color-palette",
        displayName: "Color Palette",
      },

      {
        name: "tree-view",
        displayName: "Tree view",
      },
    ],
  },
  {
    name: "services",
    displayName: "Services",
    children: [
      {
        name: "global-config",
        displayName: "Global Config",
      },
      {
        name: "components-config",
        displayName: "Components Config",
      },
      {
        name: "icons-config",
        displayName: "Icons Config",
      },
      {
        name: "colors-config",
        displayName: "Colors Config",
      },
      {
        name: "colors-classes",
        displayName: "Colors Classes",
        meta: {
          badge: navigationBadge.new('1.6.0'),
        }
      },
      {
        name: "breakpoints",
        displayName: "Breakpoint Service",
      },
      {
        name: "i18n",
        displayName: "I18n",
      },
    ],
  },
  {
    name: "compiler",
    displayName: "Compiler",
    meta: {
      badge: navigationBadge.new('1.10.0'),
    },
    children: [
      {
        name: 'devtools',
        displayName: 'Devtools',
        meta: {
          badge: navigationBadge.wip('1.10.0'),
        },
        path: '/compiler/devtools',
      },
      {
        name: 'css-layers',
        displayName: 'CSS Layers',
        meta: {
          badge: navigationBadge.new('1.10.0'),
        },
        path: '/compiler/css-layers',
      },
      {
        name: 'vuestic-config',
        displayName: 'Config',
        meta: {
          badge: navigationBadge.new('1.10.0'),
        },
        path: '/compiler/vuestic-config',
      }
    ]
  },
  {
    name: "extensions",
    displayName: "Integrations",
    disabled: true,
    children: [
      {
        name: "nuxt",
        displayName: "Nuxt",
        path: "/getting-started/nuxt"
      },
      {
        name: "ag-grid",
        displayName: "AG Grid Theme",
        meta: {
          badge: navigationBadge.updated('1.6.0'),
        }
      },
      {
        name: 'tailwind',
        displayName: 'Tailwind Integration',
        meta: {
          badge: navigationBadge.new('1.6.0'),
        },
        path: '/styles/tailwind'
      },
      {
        name: "unocss",
        displayName: "UnoCSS Integration",
        meta: {
          badge: navigationBadge.new('1.6.0'),
        }
      },
      {
        name: 'unplugin-vue-components',
        displayName: 'Auto import plugin',
        meta: {
          badge: navigationBadge.new('1.9.9'),
        }
      },
      {
        name: 'formkit',
        displayName: 'FormKit integration',
      },
      {
        name: 'vueform',
        displayName: 'Vueform integration',
      }
    ],
  },
  {
    name: "contribution",
    displayName: "Contribution",
    children: [
      {
        name: "guide",
        displayName: "Guide",
      },
      {
        name: "structure",
        displayName: "Structure",
      },
      {
        name: "ui-element-guide",
        displayName: "UI Element Guide",
      },
      {
        name: "documentation-page",
        displayName: "Documentation Guide",
      },
      {
        name: "tree-shaking-requirements",
        displayName: "Tree Shaking Requirements",
      },
    ],
  },
  {
    name: "support",
    displayName: "Support",
    disabled: true,
    children: [
      {
        name: "discord",
        displayName: "Discord",
        path: 'https://discord.com/invite/u7fQdqQt8c'
      },
      {
        name: "consulting",
        displayName: "Support & Consulting",
      },
    ]
  }
];
