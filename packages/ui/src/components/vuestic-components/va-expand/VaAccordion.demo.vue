<template>
  <VbDemo>
    <VbCard>
      <va-accordion style="width: 400px;">
        <va-expand>
          <span slot="header">One expand</span>
          <div slot="body">
            <div>
              Expand first content
            </div>
          </div>
        </va-expand>
        <va-expand>
          <span slot="header">Two expand</span>
          <div slot="body">
            <div>
              Expand three content
            </div>
          </div>
        </va-expand>
        <va-expand>
          <span slot="header">Three expand</span>
          <div slot="body">
            <div>
              Expand three content
            </div>
          </div>
        </va-expand>
      </va-accordion>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaAccordion from './VaAccordion'
import VaExpand from './VaExpand'

export default {
  components: {
    VaAccordion,
    VaExpand,
  },
}
</script>
