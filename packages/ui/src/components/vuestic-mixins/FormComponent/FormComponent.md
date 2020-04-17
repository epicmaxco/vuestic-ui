## How to create Form Component

* add FormComponentMixin to component.
* implement `focus` and `reset` public methods.
* add `value` prop.
* in spec test component with `testIsFormComponent`. You can see an example for `VaCheckbox`.
* use `va-input-wrapper` for errors handling inside of component.
* Form components have `isFormComponent` flag. Think of it as of interface declaration.
