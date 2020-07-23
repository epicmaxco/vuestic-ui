<template>
  <VbDemo>
    <VbCard>
      <va-expand-group v-model="value" style="width: 400px;">
        <va-expand
          header="First expand"
        >
          <div>
            First expand content
          </div>
        </va-expand>
        <va-expand
          header="Second expand"
        >
          <div>
            Second expand content
          </div>
        </va-expand>
        <va-expand
          header="Third expand"
        >
          <div>
            Third expand content
          </div>
        </va-expand>
      </va-expand-group>
    </VbCard>

    <VbCard>
      <va-expand-group v-model="value" multiply style="width: 400px;">
        <va-expand
          header="First expand"
        >
          <div>
            First expand content
          </div>
        </va-expand>
        <va-expand
          header="Second expand"
        >
          <div>
            Second expand content
          </div>
        </va-expand>
        <va-expand
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
      value: true,
    }
  },
}
</script>
