# Component arguments

## Overview

Component may have multiple arguments that changes how component must be rendered. Arguments are declared in user's code.
This regulates how users code must be parsed and used in virtual component as arguments.
Virtual components use arguments during rendering SFC.

## Parsing Arguments

When virtual component is used in user's code, compiler context must be created.
Compiler context includes user provided arguments: props, listeners, directives, slots.

## Compile Arguments

### Attrs

Similar to Vue SFC virtual component may have attributes. Attributes passed to virtual component root element.

```html
<template>
  <VcButton disabled>
    Main
  </VcButton>
</template>
```

```html
<template>
  <button disabled>
    Main
  </button>
</template>
```