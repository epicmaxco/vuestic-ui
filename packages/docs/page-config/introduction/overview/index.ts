export default definePageConfig({
  meta: {
    title: "Overview",
    category: "introduction",
  },

  blocks: [
    block.title("overview.title"),
    block.paragraph("overview.description"),

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

    block.subtitle("overview.featuresOverview"),
    block.list([
      "overview.features[0]",
      "overview.features[1]",
      "overview.features[2]",
      "overview.features[3]",
      "overview.features[4]",
      "overview.features[5]",
      "overview.features[6]",
      "overview.features[7]",
    ]),
  ],
});
