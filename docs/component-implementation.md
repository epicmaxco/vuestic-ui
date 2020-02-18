# How components should be implemented

This document is intended to collect key concepts we want to ingrain in components as well as detail their purpose.

## Stateless
Let's start with a short example. Here's a checkbox:
```vue
<va-checkbox :value="true"/>
```
For stateful component (which is majority on the market), checkbox will still be operable:
```
On click:
[x] => [ ]
```
For stateless component that's not the case, as state is always handled from the parent.
```
On click:
[x] => [x]
```
To make it work you have to do either of these:
```vue
<va-checkbox v-model="value"/>
<va-checkbox :value="value" @input="value = $event"/>
```

### But why would we want statelessness?

Because it gives more flexibility in complex cases. Here's an example:
* On checkbox click you want to make a request to backend.
* While request is ongoing you want to show loader.
* On request success checkbox should become checked.

This is very hard to achieve with stateful component and trivial with stateless one.

### Do we want statelessness everywhere?

To a significant degree, yes. We might want to introduce stateful interaction for some of components to simplify interface, in which case user should be able to select mode. I.e. for checkbox, that would be:

```vue
<va-checkbox statefull/>
```

### Downsides of statelessness
* Stateless components won't work for static form without value passed. That's hardly a case we ever encountered though, and it's still easy to circumvent.

## Tested
While a need for some testing is an obvious requirement for high quality UI components, exact implementation is worth discussing.

### Demos

All components are covered by demos. To navigate between them we use [vue-book](https://github.com/asvae/vue-book#readme) and the demos themselves are just `*.demo.vue` files (`.demo` part allows webpack to automatically import them).

Every demo is split into multiple cards. Here's some good ideas on how to keep your demo quality high:

* For every component prop keep separate card.
* Keep demos simple: no `v-for` if possible, single example for every case.
* Demos are not for presentation nor for end user, they're for development and represent component interface. I.e. if something is declared in demo - it should work. If it's not declared - it might or might not work. That concerns not only props, but composition examples as well.
* If you need to test component interaction (e.g. `va-divider` in `va-list`) - move the card to separate file, then import it to both component demos.
* We want to keep demos as independent from external systems as possible. I.e. if component supports context system - it should be tested and operate without context just fine. Creating multiple interdependencies kills the spirit of unit testing and significantly lowers demo value.
* Don't mash everything into single cards and provide controls for dev to test manually. While this kind of playground is sometimes useful to end user, developer might need to test all cases to be confident. For significant number of props that's not feasible. Keeping cases separate provides visibility and indication of feature collisions (spots of interest for tester).
* Don't use global styles (`.ma-2`, `text-danger` etc.) for component styling. Components should be usable without global styles.

### Tests

Demos are useful for components, but not as useful for services. If you find a need to test some complicated service or helper - use unit tests. We have `jest` connected and ready for use.

### Future

* For ready (not prototypes) components we want to introduce more unit tests. Mostly as a regression prevention measure.
* We want some cross-browser visual recognition testing.

### QA process

* Most of QA happens while developing. I.e. developer itself handles majority of bugs.
* Each PR is reviewed and iterated to completion.
* Before release we run a round of internal testing (teammates will click through docs and document found bugs in issues).

[TODO]
Tabbable
Pretty
Independent
