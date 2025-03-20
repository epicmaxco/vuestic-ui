# Component arguments

## Overview

Component may have multiple arguments that changes how component must be rendered. Arguments are declared in user's code.
This regulates how users code must be parsed and used in virtual component as arguments.
Virtual components use arguments during rendering SFC.

## Parsing Arguments

When virtual component is used in user's code, compiler context must be created.
Compiler context includes user provided arguments: props, listeners, directives, slots.

## Compile Arguments

### Slots

Similar to Vue SFC virtual component may have `default slot`, `named slot` and multiple of them.
In compiler context must be included slots: slot name, children ast, slot bind.

#### Example

```html
<template>
  <VcButton>
    <template #icon>
      👺
    </template>
    Ban user
  </VcButton>
</template>
```

compiles to:

```html
  <button>
    <span class="mr-2">👺</span>
    Ban user
  </button>
```
