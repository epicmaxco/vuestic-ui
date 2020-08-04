The general idea of this mixin is to provide user with a choice, whether component should be stateful or not.
In many cases stateful components require less code for simplest cases, which might be a majority for some projects.

Here's how component should operate for `stateful === true`:

Component shouldn't require `value` or `@input` handling from parent to be able to function. But it still updates it internal state on `:value` change if it's provided. `:value` allows to set default value for stateful component, and `@input` just informs parent of the change.

Here's how component should operate for `stateful === false`:

Internal interactions should not modify state, only emit (i.e. you won't be able to open stateless modal by clicking on anchor if @input is not handled in parent).

## Note
* Speaking of statelessness, we're referring primarily to `value`. While cursor position in select, focus, scroll etc. could technically be considered state, external control could be implemented via refs or waived off.
