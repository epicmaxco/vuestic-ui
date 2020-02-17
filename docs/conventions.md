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
* BEM is used for styles.
* Rems are used for sizes (except for cases where it doesn't make sense).
* No shortcuts: always `button` and not `btn`.
* Use shortened function declaration:`buttonClass () {` instead of `buttonClass: function () {`.

## CSS
* We have both mixins (where that's possible) and global helpers. Mixins are prefixed with `va-`. Global classes are not prefixed.
* Html tags are unstyled. For example, `table`, `li`, `h1` etc won't give you any styling. Styles are applied either via classes or `.content` wrapper.

### Fonts

* General text: `https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700`
* Icons: `https://fonts.googleapis.com/icon?family=Material+Icons`

## Github tags
We want to keep these consistent across different repos.

* 🐛 bug - Something isn't working - #d73a4a
* CI - Continuous integration & deploy - #343434
* discussion - Feedback wanted - #cc317c
* documentation - Improvements or additions to documentation - #fef2c0
* feature - Something useful to end user - #006b75
* good first issue -  - #5319e7
* high priority - Very wanted, much value - #e27a12
* question -  - #cc317c
* 📚 needs work - Issue is checked and needs some additional work - #bca8ea
* ⌛ on hold - We want this, just later - #b0c1f4
* ready for implementation - This is codeable - #9bce0e
* ready to merge -  - #0e8a16
* refactoring - Prettify code without introducing new features - #ffc4ee
* reviewed -  - #0e8a16
* research - This issue is about research, not coding - #f7ef77
* low priority - Not too wanted, little value - #5df7ce
* suggestion -  - #cc317c
* triage - Team member has to check this - #cce7ff
* WIP issue - Issue is not finished - #88c3f7
* wontfix - We won't work on that issue - #bfdadc
