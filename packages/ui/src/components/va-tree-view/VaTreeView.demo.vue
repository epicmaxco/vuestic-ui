<template>
  <VbDemo>
    <VbCard title="default">
      <va-tree-view
        :nodes="defaultNodes"
        node-key="text"
      />
    </VbCard>
    <VbCard title="With custom body">
      <va-tree-view
        :nodes="customBodyNodes"
        node-key="text"
        expand-all
      >
        <template #node-body="prop">
          <p>{{prop.body}}</p>
        </template>
      </va-tree-view>
    </VbCard>
    <VbCard title="Selection">
      <va-radio
        v-for="(option, index) in selectionTypeOptions"
        :key="index"
        v-model="selectionType"
        :option="option"
      />
      <va-tree-view
        :nodes="defaultNodes"
        node-key="text"
        expand-all
        selectable
        :selection-type="selectionType"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTreeView from './VaTreeView.vue'
import VaRadio from '../va-radio'

export default {
  name: 'VaTreeView.demo',

  components: {
    VaTreeView,
    VaRadio,
  },

  data: () => ({
    selectionType: 'leaf',
    selectionTypeOptions: ['leaf', 'independent'],
    defaultNodes: [
      {
        id: 1,
        text: 'Text 1',
        children: [
          {
            id: 2,
            text: 'Text 2',
            children: [
              { id: 3, text: 'Text 3' },
              { id: 4, text: 'Text 4' },
            ],
          },
          { id: 5, text: 'Text 5' },
        ],
      },
      { id: 6, text: 'Text 6' },
    ],
    customBodyNodes: [
      {
        id: 1,
        text: 'Text 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        children: [
          {
            id: 2,
            text: 'Text 2',
            body: 'Sed semper, tellus id lacinia faucibus, nisi magna scelerisque lorem, eu finibus quam erat vel augue.',
            children: [
              { id: 3, text: 'Text 3' },
              { id: 4, text: 'Text 4' },
            ],
          },
          {
            id: 5,
            text: 'Text 5',
            body: 'In auctor malesuada augue ac elementum.',
          },
        ],
      },
      { id: 6, text: 'Text 6' },
    ],
  }),
}
</script>

<style scoped>

</style>
