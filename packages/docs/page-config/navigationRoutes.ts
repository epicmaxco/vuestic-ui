import packageUi from 'vuestic-ui/package.json'

const uiVersion = packageUi.version

class navigationBadge {
  static new(version: string) {
    // version format: x.y.z (major.minor.patch)
    // return new until ui minor version is smaller than docs minor version
    const uiMinorVersion = parseInt(uiVersion.split('.')[1], 10);
    const docsMinorVersion = parseInt(version.split('.')[1], 10);
    if (uiMinorVersion < docsMinorVersion) {
      return {
        type: 'new',
        text: 'new',
        title: 'Recently added',
      }
    }
    // return default 
    return {
      type: '',
      text: '',
      title: '',
    };
  }

  static updated() {
    return {
      type: 'updated',
      text: 'updated',
      title: 'Recently updated',
    }  
  }

  static wip() {
    return {
      type: 'wip',
      text: 'wip',
      title: 'Work in progress',
    }
  }
}

export type NavigationRoute = {
  name: string;
  category?: string;
  displayName: string;
  meta?: {
    iconClass?: string;
    badge?: navigationBadge;
  };
  disabled?: boolean;
  children?: NavigationRoute[];
  path?: string;
};

export const navigationRoutes: NavigationRoute[] = [
  {
    name: "introduction",
    displayName: "Introduction",
    meta: {
      iconClass: "vuestic-iconset-image",
    },
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
      // GENERATOR_ADD - introduction
    ],
  },
  {
    name: "getting-started",
    displayName: "Getting Started",
    meta: {
      iconClass: "vuestic-iconset-image",
    },
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
          badge: navigationBadge.new('1.8.0'),
        },
      },
      {
        name: 'testing',
        displayName: 'Testing',
        meta: {
          badge: navigationBadge.new('1.8.0'),
        },
      },
      // GENERATOR_ADD - gettingStarted
    ],
  },
  {
    name: "styles",
    displayName: "Styles",
    meta: {
      iconClass: "vuestic-iconset-image",
    },
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
          badge: navigationBadge.new('1.8.0'),
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
      // GENERATOR_ADD - styles
    ],
  },
  {
    name: "ui-elements",
    displayName: "UI Elements",
    meta: {
      iconClass: "vuestic-iconset-ui-elements",
    },
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
          badge : navigationBadge.updated(),
        }
      },
      {
        name: "carousel",
        displayName: "Carousel",
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
      },
      {
        category: "Form",
        name: "form",
        displayName: "Form",
        meta: {
          badge : navigationBadge.updated(),
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
      },
      {
        name: "counter",
        displayName: "Counter",
      },
      {
        name: "radio",
        displayName: "Radio",
      },
      {
        name: "option-list",
        displayName: "Option List",
      },
      {
        name: "input",
        displayName: "Input",
      },
      {
        name: "select",
        displayName: "Select",
        meta: {
          badge : navigationBadge.updated(),
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
      },
      {
        name: "time-picker",
        displayName: "Time Picker",
      },
      {
        name: "time-input",
        displayName: "Time Input",
      },
      {
        name: "color-input",
        displayName: "Color Input",
      },

      {
        category: 'Layout',
        name: 'aspect-ratio',
        displayName: 'Aspect Ratio',
        meta: {
          badge : navigationBadge.new('1.8.0'),
        },
      },
      {
        name: "skeleton",
        displayName: "Skeleton",
        meta: {
          badge : navigationBadge.new('1.8.0'),
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
      },
      {
        name: "accordion",
        displayName: "Accordion",
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
          badge : navigationBadge.new('1.8.0'),
        }
      },
      {
        category: "Utility",
        name: "value",
        displayName: "Value",
        meta: {
          badge : navigationBadge.new('1.8.0'),
        }
      },
      {
        name: "config",
        displayName: "Config",
        meta: {
          badge : navigationBadge.new('1.8.0 '),
        }
      },
      {
        name: "hover",
        displayName: "Hover",
      },
      {
        name: "dropdown",
        displayName: "Dropdown",
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
          badge : navigationBadge.new('1.8.0'),
        }
      },
      {
        name: "virtual-scroller",
        displayName: "Virtual Scroller",
        meta: {
          badge : navigationBadge.new('1.8.0'),
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
      // GENERATOR_ADD - uiElements
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
        name: "ui-element-guide",
        displayName: "UI Element Guide",
      },
      {
        name: "structure",
        displayName: "Structure",
      },
      {
        name: "documentation-page",
        displayName: "Documentation Guide",
      },
      {
        name: "tree-shaking-requirements",
        displayName: "Tree Shaking Requirements",
      },
      // GENERATOR_ADD - contribution
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
      // TODO: next
      // {
      //   name: 'advanced-icons-config',
      //   displayName: 'Advanced Icons Config',
      // },
      {
        name: "colors-config",
        displayName: "Colors Config",
      },
      {
        name: "colors-classes",
        displayName: "Colors Classes",
        meta: {
          badge: navigationBadge.new('1.8.0'),
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
      // GENERATOR_ADD - services
    ],
  },
  {
    name: "extensions",
    displayName: "Extensions",
    meta: {
      iconClass: "vuestic-iconset-image",
    },
    disabled: true,
    children: [
      {
        name: "ag-grid",
        displayName: "AG Grid Theme",
        meta: {
          badge: navigationBadge.updated(),
        }
      },
      {
        name: "unocss",
        displayName: "UnoCSS Integration",
        meta: {
          badge: navigationBadge.new('1.8.0'),
        }
      },
      // GENERATOR_ADD - extensions
    ],
  },
];
