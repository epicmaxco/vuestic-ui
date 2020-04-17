# Investigation process

You can't just start implementing without some planning, right? To do planning we use issues. Process of detailing issue is called investigation. After investigation is performed, issue could be marked as `ready for implementation`. 

Here's what we do in span of investigation:
* Check existing solution. That's needed so that next developer can be sure no work is duplicated.
* Check references. Often. You may think that your solution is good, but in refs solutions are not only well thought, but also battle tested. That doesn't mean we want to copy all of things exactly (but many things we do). For new component issue we want a component that's implemented in several frameworks, and for features we want ones with good overlap between different frameworks. We can take some less useful features if these are easy enough to implement.
* If some feature is not good enough for right now, but you do not want your efforts to go waste, create separate issue detailing the feature and mark it as `low priority`.
* We have a variety of mixins (you can search in IDE for files with "mixin" in name), some of which might be relevant for current components. So be sure to give these a quick glance over while investigating. Worth noting that for almost all components we want makeContextablePropsMixin as this allows context system to operate.
* If there was some design overhaul or component is new - add a point to ask @xx13 to review design.

# How components should be implemented

This section is intended to collect key concepts we want to ingrain in components as well as detail their purpose.

## Statelessness
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

## Tests
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

### Unit tests

Demos are useful for components, but not as useful for services. If you find a need to test some complicated service or helper - use unit tests. We have `jest` connected and ready for use.

### Future

* For ready (not prototypes) components we want to introduce more unit tests. Mostly as a regression prevention measure.
* We want some cross-browser visual recognition testing.
* We want a playground with a variety of component to simplify manual testing. Currently this role is taken by vuestic-admin, but that might not be the case in future.

### QA process

* Most of QA happens while developing. I.e. developer itself handles majority of bugs.
* Each PR is reviewed and iterated to completion.
* Before release we run a round of internal testing (teammates will click through docs and document found bugs in issues).

## Keyboard navigation
While keyboard navigation has some accessibility benefits - main purpose is to speed up typing for management people, who have to type a lot of repetitive forms. We want all component interactions to support keyboard navigation.

## Visual style
We want visual style for components to be very close to design. But not to the point where it infringes on architecture and code quality.

## Independent
Ideally we want components to be able to be used without any configs, `v-app` wrappers, external styles, etc. But, when config is provided - component should use it.
Here's an example of fallback strategy for checkbox color:
```
local color > global color > local theme > global theme > black
```
It could be more refined, depending on component, but general idea of implementation is to provide graceful fallback and test all possible states.

# What is left on the side
We can't create perfect components, given time and resource constraints. So we'll have some drawbacks compared to adult frameworks, such as Vuetify or Quasar:
* `vuestic-ui` won't be as feature rich. We want basic set of features for 1.0, which we can improve at later versions.
* Automated testing is out, but we want this eventually.
* Accessibility (a11y) takes low priority, but we still want it in places where it doesn't take too much effort.
