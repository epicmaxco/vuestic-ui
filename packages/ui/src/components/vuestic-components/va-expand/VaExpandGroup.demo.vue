<template>
  <VbDemo>
    <VbCard>
      <va-expand-group style="width: 400px;">
        <va-expand
          v-model="value[0]"
          header="First expand"
        >
          <div>
            First expand content
          </div>
        </va-expand>
        <va-expand
          v-model="value[1]"
          header="Second expand"
        >
          <div>
            Second expand content
          </div>
        </va-expand>
        <va-expand
          v-model="value[2]"
          header="Third expand"
        >
          <div>
            Third expand content
          </div>
        </va-expand>
      </va-expand-group>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaExpandGroup from './VaExpandGroup'
import VaExpand from './VaExpand'

export default {
  components: {
    VaExpandGroup,
    VaExpand,
  },
  data () {
    return {
      value: [false, false, false],
    }
  },
}
</script>
