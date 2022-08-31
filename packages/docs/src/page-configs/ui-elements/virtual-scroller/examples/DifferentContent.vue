<template>
  <va-virtual-scroller
    :items="hugeArray"
    style="height: 400px;"
    :bench="10"
    v-slot="{item}"
  >
    <div class="row">
      <div class="flex md6 lg4">
        <va-card>
          <va-image
            src="https://picsum.photos/400/200"
            style="height: 200px;"
          />
          <va-card-title>{{ item }}</va-card-title>
          <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
        </va-card>
      </div>
    </div>
  </va-virtual-scroller>
</template>

<script>
import { hugeArray } from './Default'

export default {
  data: () => {
    return { hugeArray }
  },
}
</script>
