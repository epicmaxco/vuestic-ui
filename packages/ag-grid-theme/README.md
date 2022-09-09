<h1 align="center">AG Theme Vuestic</h1>
<p align="center"><img src="https://img.shields.io/npm/v/@vuestic/ag-grid-theme?label=ag-grid-theme"></p>
Custom theme with Vuestic UI styles for AG Grid Vue 3.

## Installation

#### npm
```
npm i @vuestic/ag-grid-theme
```
#### yarn
```
yarn add @vuestic/ag-grid-theme
```
Import styles to project via entry js/ts file:

```js
// main.js

import '@vuestic/ag-grid-theme/index.scss'
```
or via a scss:
```scss
// *.scss or <styles lang="scss">

@import "~@vuestic/ag-grid-theme";
```

## Usage
```vue
<template>
  <div>
    <ag-grid-vue
      class="ag-theme-vuestic"
      style="width: 100%; height: 100%;"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :modules="modules"
    />
  </div>
</template>
```

```js
<script>
  import { AgGridVue } from '@ag-grid-community/vue3'
  import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

export default {
  components: { AgGridVue },
  data () {
    return {
      modules: [ClientSideRowModelModule],
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

```scss
<style lang="scss">
@import "~@vuestic/ag-grid-theme";
</style>
```



## Documentation

Information about styles and examples are available
on [vuestic.dev](https://vuestic.dev/en/extensions/ag-grid)

For more information about AG Grid for Vue 3, visit [ag-grid.com](https://www.ag-grid.com/vue-data-grid/getting-started/)

## License

[MIT](https://github.com/epicmaxco/vuestic-ui/blob/develop/LICENSE.MD) license
