## Components
### Props
* `color` prop should be used for `background-color`
* `text-color` prop should be used for css `color`
* `size` both string and numeric value should be supported (string: `"200px"`, `"2rem""`; numeric: `200`). In case of numeric value we consider it `px`.

### Components should be

* **Stateless**. For example, checkbox shouldn't be toggleable without value prop.
* **Tabbable**. Should be operable with keyboard alone.
* **Demoable**. All components and all component features should be covered with demos.
* **Pretty**. Should fit design (all of it).
* **Independent**. Relying on external library should be well though.
* **Cross-browser**. IE10+ for all major browsers.
* **Mobile-friendly**. Operate on mobile properly.

In future we also plan to be :
* **Accessible**. Should use semantic tags and aria-attributes.
* **Tested**. We want significant test coverage for core-functionality.
    
### Small things to note

* Translations are done with `$t('key')` syntax, not `'key' | translate`.
* `prop="string-value"` is used instead of `:prop="'string-value'"`.
* Short syntax is used for boolean props where possible (`hide` instead of `:hide="true"`).
* Self closing tags are used where possible (`<slot/>` instead of `<slot></slot>`).
* No shortcuts: always `button` and not `btn`. Your naming should be well understood by all developers.

## TypeScript usage
* You can use `@ts-nocheck` | `@ts-ignore` | `any` where it's appropriate. We want strict typing not to get in way of development. Also some mixins or plugins, such as context are fairly challenging to implement in a way to keep typing intact, and there is no much point given we will transition to Composition API sometime in the future.

## Style
* BEM is used for styles.
* Rems are used for sizes (except for cases where it doesn't make sense).

### Global classes
* Global helpers should be considered a separate library/plugin. Components should not rely on global classes!
* All vuestic global classes should be prefixed with `va-`.
* Html tags are unstyled. For example, `table`, `li`, `h1` etc won't give you any styling. Apply styles either via classes or `.content` wrapper.

### Components
* Mixins should be used for style logic reuse inside components.

### Fonts

* General text: `https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700`
* Icons: `https://fonts.googleapis.com/icon?family=Material+Icons`

## Github tags
We want to keep these consistent across different repos.

* blocked - Blocked by another issue - #778899
* bug - Something isn't working - #d73a4a
* CI - Continuous integration & deploy - #343434
* component - Has direct relation to component - #bfdadc
* discussion - Feedback wanted - #cc317c
* dependencies - Pull requests that update a dependency file - #0366d6
* docs - packages/docs - #04afe2
* duplicate - This issue or pull request already exists - #cfd3d7
* feature request -  - #cce7ff
* feature - Something useful to end user - #006b75
* good first issue -  - #5319e7
* high priority - Very wanted, much value - #e27a12
* in progress - Work in progress - #4d92b7
* low priority - Not too wanted, little value - #5df7ce
* no repro - We can't reproduce the issue - #e5698c
* on hold - We want this, just later - #b0c1f4
* partially implemented - Issue is checked and needs some additional work - #bca8ea
* question -  - #cc317c
* ready for design - Requirements are laid out, but design is needed to continue - #0052cc
* needs work - Issue is checked and needs some additional work - #bca8ea
* ready for implementation - This is codeable - #9bce0e
* ready to merge -  - #0e8a16
* refactoring - Prettify code without introducing new features - #ffc4ee
* research - This issue is about research, not coding - #f7ef77
* review required - Needs a pair of eyes before we continue - #c0c2f9
* reviewed -  - #0e8a16
* suggestion -  - #cc317c
* triage - Team member has to check this - #cce7ff
* WIP issue - Issue is not finished - #88c3f7
* wontfix - We won't work on that issue - #bfdadc
