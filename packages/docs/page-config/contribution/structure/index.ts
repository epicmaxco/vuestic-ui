export default definePageConfig({
  blocks: [
    block.title('Structure'),
    block.paragraph(`Here you can learn about Vuestic UI file structure and understand how to keep your work synced with our conventions. It's great to check when you're unsure, though sometimes it's easier to understand just by looking on file contents.`),

    block.subtitle('Components'),
    block.fileStructure([
      {
        name: "va-[component-name]",
        description: "Component folder",
        children: [
          {
            name: "components",
            description: "Inner components specific to this component.",
            children: [
              {
                name: "Va[SubComposableName].vue",
              },
            ],
          },
          {
            name: "hooks",
            description: "Composables specific to this component.",
            children: [
              {
                name: "use[ComposableName].ts",
              },
            ],
          },
          {
            name: "plugins",
            description: "Plugins that are required for this component (usually you don't need plugin).",
            children: [
              {
                name: "index.ts",
                description: "Just plugin exports (using named exports).",
              },
            ],
          },
          {
            name: "tests",
            children: [
              {
                name: "Va[ComponentName].spec.js",
                description: "Generally not recommended to test components. It's better value to use story interactions. But do if you must.",
              },
              {
                name: "use[ComposableName].spec.js",
                description: "Composables are recommended to unit test. Consider handling all edge cases.",
              },
            ],
          },
          {
            name: "utils",
            description: "Component helpers (if possible - use composables instead).",
          },
          {
            name: "_variables.scss",
            description: "Component css variables. Store here everything that could be used for customization.",
          },
          {
            name: "index.ts",
            description: "Everything that will be exported from `vuestic-ui`.",
          },
          {
            name: "types.ts",
            description: "Component specific files.",
          },
          {
            name: "Va[ComponentName].demo.vue",
            description: "Component demo. Most of the development on component happens in context of demo.",
          },
          {
            name: "Va[ComponentName].vue",
            description: "Component main file.",
          },
        ],
      },
    ]),
    block.paragraph('From `./types.ts` export all types: prop types, emit events etc.'),
    block.paragraph("From `./index.ts` export both component and its sub-components using named exports. Then you should also connect it in `/src/components/index.ts` - all components should be registered there."),
    block.paragraph("From `./plugin/index.ts` export plugin with named export. It should use `defineVuesticPlugin`. This plugin will be available in `vuestic-ui` root exports."),
    block.alert("`./plugins` is still experimental folder, you likely don't need it.", 'warning'),
    block.paragraph('We write all component with Composition API. Key reason is high reuse value of composables.'),
    block.markdown(`
Here's a checklist you can go through when working on component:

- Component name should always have \`Va\` prefix.
- All CSS varisables should have \`va-\` prefix.
- CSS variables are meant as a part of interface. We expect users to change them. CSS variables are pretty expensive though, so please don't use them on styles that are unlikely to be changed by user (also user can directly override class if it's a must). Here's some examples:
  - good: color, font, border;
  - bad: align-items, top, left.
- Use props from composables if needed.
- Provide typing for complex types via \`PropType\`.
- Don't use \`required\` for props, use \`default\` instead. User expects component to work with as few props as possible.
- Make sure component supports \`stateful\` mode.
- Explicitly define \`emits\` so that typescript would be able to derive type. We also use emits in documentation.
- Check existing composables before creating new one.
- Remember about SSR. Use SSR-friendly composables like \`useClickOnly\`, \`useDocument\`, \`useEvent\` etc.
- Remember that user can access component methods with \`ref\`. Expose methods like \`focus\`, \`validate\` from setup function.
- Follow CSS variables guide.
- Use BEM for component classes. We support tailwind, but it's only for external usage.
- Use SCSS mixins.
- Do not use \`scoped\` styles in components.
- Follow Accessibility best practices: use semantic tags, aria attributes, hover state etc.
`),


    block.subtitle('Composables'),
    block.paragraph('Composable - function that is used inside of component \`setup\` block. Usually it provides reactive variables, computeds or methods.'),
    block.paragraph('Check https://vueuse.org/ when you work with composables. They already have a lot of functionality we need. You also may check how they implement composables.'),
    block.markdown(`
Here's a checklist you can go through when working on composable:

- Start composable name with \`use\`.
- Write composable in one file. If you have large composable, split it in multiple small composables. If these composables are useless without each other, use folder with \`index.ts\` and export one composable from here.
- Composable can return one object (reactive or ref) or object that contains refs, methods computeds.
- Reuse composables if possible.
- Export (or even re-export) types in composable.
- Attach your composable to \`/src/composables/index.ts\`;
- Write tests under \`/src/composables/tests/use[ComposableName].spec.ts\`. It's a great idea to uint-test composables.
    `),

    block.subtitle('Styles'),
    block.markdown(`
There are three types of styles:
- **CSS modules** - css file with global styles. CSS modules must be independent and focus on one feature. For example: typography, grid, normalize.
- **SCSS resources** - there must be only SCSS variables (! prefer CSS variables instead) or SCSS mixins. Resources can be used in modules, but they should never expose global styles by themselves.
- **Essential** - css that must be included in user's app or components will break. For example - CSS variables.
    `),
    block.fileStructure([
      {
        name: "styles",
        description: "Folder with styles that are not related to specific components.",
        children: [
          {
            name: "essential.scss",
            description: "Essential styles. These styles must be included in user's app",
          },
          {
            name: "[module]",
            description: "Module with optional style helpers. For example: typography, grid-system, normalize.",
            children: [
              {
                name: "index.scss",
              },
              {
                name: "mixins.scss",
                description: "Mixins for this module. Shouldn't contain any runtime CSS",
              },
              {
                name: "variables.scss",
                description: "Variables for this module. Shouldn't contain any runtime CSS",
              }
            ],
          },
          {
            name: "resources",
            description: "Folder with SCSS variables and mixins. Shouldn't contain any runtime CSS",
            children: [
              {
                name: "index.scss",
              },
              {
                name: "mixins.scss",
                description: "Mixins that can be used in any module. Shouldn't contain any runtime CSS",
              },
              {
                name: "variables.scss",
                description: "Variables that can be used in any module. Shouldn't contain any runtime CSS",
              },
            ],
          }
        ],
      }
    ]),
    block.subtitle('Services'),
    block.paragraph('Ideally all services must be independent so that user is able to use only what they want. But we have two exceptions: GlobalConfig, ColorConfig - these are essential for Vuestic components, at least for now. Please don\'t implement services without planning or discussion with team.'),
    block.fileStructure([
      {
        name: "services",
        description: "Folder with all services",
        children: [
          {
            name: "[service-name]",
            description: "Specific service folder",
            children: [
              {
                name: 'tests',
                description: 'It\'s a great idea to test services.',
                children: [],
              },
              {
                name: 'plugin',
                children: [
                  {
                    name: 'index.ts',
                    description: 'Plugin with `defineVuesticPlugin`. Plugin later will be used by user in tree-shaking.',
                  },
                ]
              },
              {
                name: 'config',
                children: [
                  {
                    name: 'index.ts',
                    description: 'Defaults for global config.',
                  },
                ]
              },
              {
                name: 'types.ts',
              },
              {
                name: 'index.ts',
              }
            ]
          },
        ],
      }
    ]),

    block.subtitle('Utils'),
    block.paragraph('Utils are helper functions that can be used in multiple places. Usually utils are not related to Vuestic UI. e.g. `isDefined`'),
    block.alert('Make sure to keep all utils in mind and reuse them when possible', 'info'),
  ]
})
