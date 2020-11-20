<template>
  <VbDemo>
    <VbCard title="Default">
      <va-expand-group v-model="value" style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-expand-group>
    </VbCard>

    <VbCard title="Multiply">
      <va-expand-group v-model="valueArray" multiply style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ expand.content }}
          </div>
        </va-collapse>
      </va-expand-group>
    </VbCard>

    <VbCard title="Inset">
      <va-expand-group v-model="value" inset style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-expand-group>
    </VbCard>

    <VbCard title="Inset multiply">
      <va-expand-group v-model="valueArray" inset multiply style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-expand-group>
    </VbCard>

    <VbCard title="Popout">
      <va-expand-group v-model="value" popout style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-expand-group>
    </VbCard>

    <VbCard title="Popout multiply">
      <va-expand-group v-model="valueArray" popout multiply style="width: 400px;">
        <va-collapse
          v-for="(collapse, index) in collapses"
          :key="index"
          :header="collapse.title"
        >
          <div>
            {{ collapse.content }}
          </div>
        </va-collapse>
      </va-expand-group>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaExpandGroup from './VaExpandGroup'
import VaCollapse from './../va-collapse/VaCollapse'

export default {
  components: {
    VaExpandGroup,
    VaCollapse,
  },
  data () {
    return {
      value: [false, false, false],
      valueArray: [false, true, false],
      collapses: [
        { title: 'First expand', content: 'first expand content' },
        { title: 'Second expand', content: 'second expand content' },
        { title: 'Third expand', content: 'third expand content' },
      ],
    }
  },
}
</script>
