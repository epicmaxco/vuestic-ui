<template>
  <VbDemo>
    <VbCard title="Default">
      <va-accordion v-model="value" style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-accordion>
    </VbCard>

    <VbCard title="Multiply">
      <va-accordion v-model="valueArray" multiply style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-accordion>
    </VbCard>

    <VbCard title="Inset">
      <va-accordion v-model="value" inset style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-accordion>
    </VbCard>

    <VbCard title="Inset multiply">
      <va-accordion v-model="valueArray" inset multiply style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-accordion>
    </VbCard>

    <VbCard title="Popout">
      <va-accordion v-model="value" popout style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-accordion>
    </VbCard>

    <VbCard title="Popout multiply">
      <va-accordion v-model="valueArray" popout multiply style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-accordion>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaAccordion from './index'
import VaCollapse from '../va-collapse'

export default {
  components: {
    VaAccordion,
    VaCollapse,
  },
  data () {
    return {
      value: [false, false, false],
      valueArray: [false, true, false],
      collapses: [
        { title: 'First collapse', content: 'first collapse content' },
        { title: 'Second collapse', content: 'second collapse content' },
        { title: 'Third collapse', content: 'third collapse content' },
      ],
    }
  },
}
</script>
