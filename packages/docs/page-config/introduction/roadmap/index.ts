import { RoadmapItem } from "./types";

export default definePageConfig({
  blocks: [
    block.title("Vuestic UI Roadmap"),
    block.paragraph("Our team is constantly improving the existing code base and adding new features that help building applications even easier."),
    block.subtitle("In development"),
    block.paragraph("The following features are currently being in development:"),

    block.headline("v1.8"),
    block.component("Roadmap", {
      roadmap: [
        {
          title: "Color Picker",
          type: "component",
          image: "colorPicker",
        },
        {
          title: "Page Layout",
          type: "component",
          image: "PageLayout"
        },
        {
          title: "Menu",
          type: "component",
          image: "Menu"
        },
        {
          title: "Vuestic Design Kit",
          type: "other",
        },
        {
          title: "Input redesign",
          type: "component",
        },
        {
          title: "Accessibility Improvements",
          type: "other",
        },
        {
          title: "Docs Improvements",
          type: "other",
        }
      ] as RoadmapItem[],
    }),

    block.subtitle("Released"),

    block.headline("[v1.7](https://github.com/epicmaxco/vuestic-ui/milestone/27)"),
    block.paragraph("We focus on improving existing components and documentation pages."),
    block.component("Roadmap", {
      roadmap: [
        {
          title: "Form improvements",
          type: "component",
        },
        {
          title: "Accessibility Improvements",
          type: "other",
        },
        {
          title: "Docs Improvements",
          type: "other",
        },
        {
          title: "Bug fixes",
          type: "other",
        },
        {
          title: "Performance improvements",
          type: "other",
        },
      ] as RoadmapItem[],
    }),

    block.headline("[v1.6](https://github.com/epicmaxco/vuestic-ui/milestone/19)"),
    block.paragraph("We focus on new services, components and integration with CSS frameworks."),

    block.component("Roadmap", {
      roadmap: [
        {
          title: "Create Vuestic",
          type: "service",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/2828",
          image: "createVuestic",
        },
        {
          title: "Skeleton",
          type: "component",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/2918",
          image: "Skeleton",
        },
        {
          title: "Auto Complete",
          type: "component",
          link: "https://github.com/epicmaxco/vuestic-ui/issues/2228",
          image: "autoComplete",
        },
        {
          title: "Breakpoints",
          type: "service",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/2189",
          image: "breakpoints",
        },
        {
          title: "Stepper",
          type: "component",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/2906",
          image: "stepper",
        },
        {
          title: "Tailwind Integration",
          type: "other",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/2745",
          image: "tailwind",
        },
        {
          title: "Docs improvements",
          type: "other",
        },
      ] as RoadmapItem[],
    }),

    block.headline("[v1.5](https://github.com/epicmaxco/vuestic-ui/milestone/11)"),
    block.paragraph("We focus on new services, components, testing and automation."),

    block.component("Roadmap", {
      roadmap: [
        {
          title: "Dark theme",
          type: "service",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/1865",
          image: "DarkTheme",
        },
        {
          title: "Component Presets",
          type: "service",
          link: "https://github.com/epicmaxco/vuestic-ui/issues/1806",
          image: "Presets",
        },
        {
          title: "CSS Helpers",
          type: "service",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/1890",
          image: "CSSHelpers",
        },
        {
          title: "TreeView",
          type: "component",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/1728",
          image: "TreeView",
        },
        {
          title: "Dropdown",
          type: "component",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/2109",
          image: "Dropdown",
        },
        {
          title: "SplitPanel",
          type: "component",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/2068",
          image: "SplitPanel",
        },
        {
          title: "Button redesign",
          type: "redesign",
          link: "https://github.com/epicmaxco/vuestic-ui/pull/1945",
          image: "Buttons",
        },
        // {
        //   title: 'Breakpoints',
        //   type: 'service',
        //   link: 'https://github.com/epicmaxco/vuestic-ui/pull/1945',
        //   image: 'Breakpoints',
        // },
        {
          title: "Attributes Config",
          type: "service",
          link: "https://github.com/epicmaxco/vuestic-ui/issues/1954",
          image: "AttributesConfig",
        },
      ] as RoadmapItem[],
    }),

    block.headline("[v1.4](https://github.com/epicmaxco/vuestic-ui/milestone/7)"),
    block.paragraph("* Carousel component. \n * Stepper component. \n * Nuxt support."),

    block.headline("[v1.3](https://github.com/epicmaxco/vuestic-ui/releases/tag/v1.3.0)"),
    block.paragraph("* CSS only table. \n * Data Table component. \n * Data Table theme for [AG grid](https://www.ag-grid.com/)[[target=_blank]]."),

    block.headline("[v1.2](https://github.com/epicmaxco/vuestic-ui/releases/tag/v1.2.1)"),
    block.paragraph("* Date Input component. \n * Date Picker component. \n * Tree shaking (allows to import only components you need, reducing bundle size)."),

    block.headline("[v1.1](https://github.com/epicmaxco/vuestic-ui/releases/tag/v1.1.0)"),
    block.paragraph("* SSR support (vite). \n * Remove medium-editor wrapper. \n * Russian translation. \n * Reduce bundle size (482KB)."),

    block.headline("[v1.0](https://github.com/epicmaxco/vuestic-ui/tree/v1.0.0)"),
    block.paragraph("Starting point of vuestic-ui. \n * Reworked and added multiple components. \n * Added proper documentation."),

    block.headline("[v0.1](https://github.com/epicmaxco/vuestic-ui/tree/1.0.0-alpha.0)"),
    block.paragraph("Not even alpha, we've just split components from [vuestic-admin](https://github.com/epicmaxco/vuestic-admin)[[target=_blank]] into separate repository to simplify updates."),
  ],
});
