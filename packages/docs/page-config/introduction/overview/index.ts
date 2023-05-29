export default definePageConfig({
  meta: {
    title: "Overview",
    category: "introduction",
  },

  blocks: [
    block.title("What is Vuestic UI"),
    block.paragraph("Vuestic UI is an OpenSource Vue 3 based UI framework. It is a MIT-licensed UI framework that provides ready-to-use frontend components that are easily configurable and speed up development of responsive and fast-loading web interfaces. It was initially released in May 2021 by [Epicmax](https://epicmax.co/)[[target=_blank]] and that is what Vuestic UI today:\n\n"),

    // TODO: uncomment when we have more content
    // block.cards([
    //   {
    //     title: 'Easy to start',
    //     text: 'Create new Vite or Nuxt app with Vuestic UI in 2 min',
    //     cols: 1/2,
    //     color: 'success',
    //     link: {
    //       text: 'Get started',
    //       href: '/getting-started/installation'
    //     }
    //   },
    //   {
    //     title: 'Plenty of components',
    //     text: 'More than 60 ready to use accessible components',
    //     cols: 1/2,
    //     color: '#ef476f',
    //     link: {
    //       text: 'Take a quick look',
    //       href: '/getting-started/kitchensink'
    //     }
    //   },
    //   {
    //     title: 'Highly customizable',
    //     text: 'Change color scheme or component look with GlobalConfig',
    //     cols: 1/2,
    //     color: 'warning',
    //     link: {
    //       text: 'Intro in customization',
    //       href: '/services/global-config'
    //     }
    //   },
    //   {
    //     title: 'Seamlessly integration',
    //     text: 'Integrate with i18n, Tailwind, AG Grid and more',
    //     cols: 1/2,
    //     color: 'info',
    //     link: {
    //       text: 'Explore integrations',
    //       href: '/no-link'
    //     }
    //   },
    //   {
    //     title: 'Great support',
    //     text: 'Complete team is working each day to improve and brings new features to Vuestic',
    //     cols: 1/2,
    //     color: '#8338ec',
    //     link: {
    //       text: 'See our Roadmap',
    //       href: '/no-link'
    //     }
    //   },
    //   {
    //     title: 'Want to contribute?',
    //     text: 'We made it is easy to improve Vuestic UI and set external requests with high priority',
    //     cols: 1/2,
    //     color: 'primary',
    //     link: {
    //       text: 'Read a Contribution Guide',
    //       href: '/no-link'
    //     }
    //   }
    // ]),

    block.subtitle("Features overview"),
    block.list([
      "Vue 3 compatible: Easy integration with the latest Vue.js\u00A0\uD83E\uDD18",
      "Contains 60+ ready-to-use classy UI components that can be used in any design solution\u00A0\uD83D\uDC85",
      "Dark Theme: Stylish built-in dark mode\u00A0\uD83D\uDDA4",
      "Accessible: designed for all users\u00A0❗",
      "Global config: Customize components effortlessly",
      "Responsive: Adapts to various screens and devices",
      "i18n integration: Simplify app internationalization",
      "Fast & professional technical support from [the core team](/introduction/team)\u00A0\uD83E\uDEC2",
    ]),
  ],
});
