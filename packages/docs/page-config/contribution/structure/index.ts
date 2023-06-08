export default definePageConfig({
  blocks: [
    block.subtitle('Components'),
    block.fileStructure([
      {
        name: "va-[component-name]",
        description: "Component folder",
        children: [
          {
            name: "components",
            description: "inner components specific to this component",
            children: [
              {
                name: "Va[SubComposableName].vue",
              },
            ],
          },
          {
            name: "hooks",
            description: "specific composables to this component",
            children: [
              {
                name: "use[ComposableName].ts",
              },
            ],
          },
          {
            name: "plugins",
            description: " plugins that required for this component (usually you don't need plugin)",
            children: [
              {
                name: "index.ts",
                description: "here should be exported all plugins using named exports",
              },
            ],
          },
          {
            name: "tests",
            children: [
              {
                name: "Va[ComponentName].spec.js",
              },
              {
                name: "use[ComposableName].spec.js",
              },
            ],
          },
          {
            name: "utils",
            description: "Prefer using composables, but store here stuff to make component clean (not recommended folder)",
          },
          {
            name: "_variables.scss",
            description: "Component css variables. Store here all that can be possible used for customization",
          },
          {
            name: "index.ts",
            description: "all stuff that will be exported from `vuestic-ui`",
          },
          {
            name: "types.ts",
            description: "specific types for this component  ",
          },
          {
            name: "Va[ComponentName].demo.vue",
            description: "Component demo",
          },
          {
            name: "Va[ComponentName].vue",
            description: "Component code itself",
          },
        ],
      },
    ]),
    block.paragraph('From `./types.ts` must be exported all types, that you need to have. e.g. prop types, emit events etc.'),
    block.paragraph("From `./index.ts` must be exported (using named exports) component and it's subcomponents. All from this file must be exported in `/src/components/index.ts`"),
    block.paragraph("From `./plugin/index.ts` must be exported plugin, that use `defineVuesticPlugin` with named export. This plugin will be available in `vuestic-ui` root exports. "),
    block.alert("`./plugins` is still experimental folder, you likely don't need to use it. ", 'warning'),
    block.paragraph('We write all component in Composition API. This allows use to re-use a lot of functional from composables.'),
    block.markdown(`
Checklist:
- Provide component name with \`Va\` prefix;
- Provide \`va-\` prefix for CSS variables;
- CSS variables must be used to change look of component. E.g. don't use css variables for styles that are not going to be changed by user;
- Use props from composables if needed;
- Type complex types with \`PropType\`;
- Prefer default value for props, instead of \`required\`;
- Make sure component support \`stateful\` mode;
- Explicitly provide \`emits\` filed. We use it in documentation later;
- Use as much composables as you can.;
- Remember about SSR. Use SSR-friendly composables like \`useClickOnly\`, \`useDocument\`, \`useEvent\` etc;
- Remember that user can access component methods with \`ref\`. Return methods like \`focus\`, \`validate\` from setup function;
- Follow CSS variables guide;
- Use \`css-variables\` only if you think that this can be helpful for user:
  - good: color, font, border
  - bad:  align-items, top, left
- Use BEM;
- Use SCSS mixins;
- Do not use \`scoped\` styles in components;
- Follow Accessibility guide e.g. do not forget about hover state, aria attributes, use semantic html;
    `),


    block.subtitle('Composables'),
    block.paragraph('Composable - function, that will be injected in component in setup function. Usually it provides reactive variables, computeds or methods.'),
    block.paragraph('Great example of composables: https://vueuse.org/ - Make sure to check it out first'),
    block.markdown(`
Checklist:
- Start composable name with \`use\`;
- Write composable in one file. If you have large composable, split it in multiple small composables. If these composables useless without each other, use folder with \`index.ts\` and export one composable from here;
- Composable can return one object (reactive or ref) or object that contain refs, methods, computeds;
- It's okay to reuse composables:
\`\`\`ts
export useDocument = () => useClientOnly(() => document)
\`\`\`
- Export (or even re-export) types in composable.
- Export all in \`/src/composables/index.ts\`;
- Write tests under \`/src/composables/tests/use[ComposableName].spec.ts\`
    `),
    block.subtitle('Styles'),
    block.markdown(`
There are three types of style
- CSS modules - css file with styles, usually with global styles. CSS modules must be independent and produce one feature. e.g. typography, grid-system, normalize;
- SCSS resources - there must be only SCSS variables (! prefer CSS variables instead) or SCSS mixins. They can be split in modules, but no style must be included in these files. 
- Essential - css, that must be included in user's app. e.g. css-variables.
    `),
    block.fileStructure([
      {
        name: "styles",
        description: "Folder with all styles which not related to specific components",
        children: [
          {
            name: "essential.scss",
            description: "Essential styles. These styles must be included in user's app",
          },
          {
            name: "[module]",
            description: "Module with styles that can be removed. e.g. typography, grid-system, normalize",
            children: [
              {
                name: "index.scss",
              },
              {
                name: "mixins.scss",
                description: "Mixins for this module. Mustn't contain any runtime CSS",
              },
              {
                name: "variables.scss",
                description: "Variables for this module. Mustn't contain any runtime CSS",
              }
            ],
          },
          {
            name: "resources",
            description: "Folder with SCSS variables and mixins. Mustn't contain any runtime CSS",
            children: [
              {
                name: "index.scss",
              },
              {
                name: "mixins.scss",
                description: "Mixins that can be used in any module. Mustn't contain any runtime CSS",
              },
              {
                name: "variables.scss",
                description: "Variables that can be used in any module. Mustn't contain any runtime CSS",
              },
            ],
          }
        ],
      }
    ]),
    block.subtitle('Services'),
    block.paragraph('Ideally all services must be independent and user must be able to remove them easily, but here two exceptions: GlobalConfig, ColorConfig - these two are essential for vuestic components, at least for now. Mostly services made by the member of the core team and highly discussed.'),
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
                children: [],
              },
              {
                name: 'plugin',
                children: [
                  {
                    name: 'index.ts',
                    description: 'plugin with `defineVuesticPlugin`. Plugin later will be used by user in tree-shaking',
                  },
                ]
              },
              {
                name: 'config',
                children: [
                  {
                    name: 'index.ts',
                    description: 'defaults for global config',
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
    block.paragraph('Utils are functions that can be used in multiple places. Usually utils are not related to vuestic-ui. e.g. `isDefined`'),
    block.alert('Make sure to check out all utils and reuse them if possible', 'info'),
  ]
})