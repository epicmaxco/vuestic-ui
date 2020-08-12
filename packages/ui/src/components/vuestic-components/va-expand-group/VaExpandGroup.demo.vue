<template>
  <VbDemo>
    <VbCard title="Default">
      <va-expand-group v-model="value" style="width: 400px;">
        <va-expand
          v-for="(expand, index) in expands"
          :key="index"
          :header="expand.title"
        >
          <div>
            {{ expand.content }}
          </div>
        </va-expand>
      </va-expand-group>
    </VbCard>

    <VbCard title="Multiply">
      <va-expand-group v-model="valueArray" multiply style="width: 400px;">
        <va-expand
          v-for="(expand, index) in expands"
          :key="index"
          :header="expand.title"
        >
          <div>
            {{ expand.content }}
          </div>
        </va-expand>
      </va-expand-group>
    </VbCard>

    <VbCard title="Inset">
      <va-expand-group v-model="value" inset style="width: 400px;">
        <va-expand
          v-for="(expand, index) in expands"
          :key="index"
          :header="expand.title"
        >
          <div>
            {{ expand.content }}
          </div>
        </va-expand>
      </va-expand-group>
    </VbCard>

    <VbCard title="Inset multiply">
      <va-expand-group v-model="valueArray" inset multiply style="width: 400px;">
        <va-expand
          v-for="(expand, index) in expands"
          :key="index"
          :header="expand.title"
        >
          <div>
            {{ expand.content }}
          </div>
        </va-expand>
      </va-expand-group>
    </VbCard>

    <VbCard title="Popout">
      <va-expand-group v-model="value" popout style="width: 400px;">
        <va-expand
          v-for="(expand, index) in expands"
          :key="index"
          :header="expand.title"
        >
          <div>
            {{ expand.content }}
          </div>
        </va-expand>
      </va-expand-group>
    </VbCard>

    <VbCard title="Popout multiply">
      <va-expand-group v-model="valueArray" popout multiply style="width: 400px;">
        <va-expand
          v-for="(expand, index) in expands"
          :key="index"
          :header="expand.title"
        >
          <div>
            {{ expand.content }}
          </div>
        </va-expand>
      </va-expand-group>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaExpandGroup from './VaExpandGroup'
import VaExpand from './../va-expand/VaExpand'

export default {
  components: {
    VaExpandGroup,
    VaExpand,
  },
  data () {
    return {
      value: [false, false, false],
      valueArray: [false, true, false],
      expands: [
        { title: 'First expand', content: 'first expand content' },
        { title: 'Second expand', content: 'second expand content' },
        { title: 'Third expand', content: 'third expand content' },
      ],
    }
  },
}
</script>
