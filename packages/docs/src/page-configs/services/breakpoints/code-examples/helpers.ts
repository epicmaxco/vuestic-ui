export const helpersCodeTemplate = `
<template>
  <h1 v-if="$vaBreakpoints.mdUp">Title</h1>
</template>
`

export const helpersCodeSetup = `
setup: () => {
  const breakpoints = useBreakpoints()
  if (breakpoints.xl) { console.log("It's XL breakpoint!") }
}
`
