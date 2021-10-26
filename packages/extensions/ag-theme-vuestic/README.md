<h1 align="center">AG Theme Vuestic</h1>
Custom theme with Vuestic UI styles for AG Grid Vue 3.

## Installation

#### npm
```
npm i @vuestic/ag-theme-vuestic
```
#### yarn
```
yarn add @vuestic/ag-theme-vuestic
```
Import styles to project via entry js/ts file:

```
// main.js

import '@vuestic/ag-theme-vuestic/index.scss'
```
or via a scss:
```
// *.scss or <styles lang="scss">

@import "~@vuestic/ag-theme-vuestic";
```

## Usage
```
<template>
  <div>
    <ag-grid-vue
      class="ag-theme-vuestic"
      style="width: 100%; height: 100%;"
      :columnDefs="columnDefs"
      :rowData="rowData"
    />
  </div>
</template>
```
```
<script>
import { AgGridVue } from 'ag-grid-vue3'

export default {
  components: { AgGridVue },
  data () {
    return {
      rowData: null,
      columnDefs: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
    }
  },
  beforeMount () {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(result => result.json())
      .then(rowData => { this.rowData = rowData })
  },
}
</script>
```
```
<style lang="scss">
@import "~@vuestic/ag-theme-vuestic";
</style>
```



## Documentation

Information about styles and examples are available
on [vuestic.dev](https://vuestic.dev/en/extensions/ag-grid)

For more information about AG Grid for Vue 3, visit [ag-grid.com](https://www.ag-grid.com/vue-data-grid/getting-started/)

## License

[MIT](https://github.com/epicmaxco/vuestic-ui/blob/develop/LICENSE.MD) license
