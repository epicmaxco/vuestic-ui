<template>
  <va-tree-view
    :nodes="nodes"
    node-key="id"
    class="customizable-content"
  >
    <template #content="prop">
      <div class="d-flex align--center">
        <va-avatar
          v-if="prop.image"
          :src="prop.image"
          style="margin-right: 0.5rem;"
        />

        <div style="margin-right: 0.5rem;">
          <b v-if="prop.label">{{ prop.label }}</b>
          <p v-if="prop.description">{{ prop.description }}</p>
        </div>

        <va-button
          v-if="prop.hasAction"
          flat
          icon="add"
          size="small"
          style="margin-left: auto;"
        />
      </div>
    </template>
  </va-tree-view>
</template>

<script>
export default {
  name: 'CustomizableContent',

  data: () => ({
    nodes: [
      {
        id: 1,
        label: 'Category',
        description: 'It is absolutely optional',
        expanded: true,
        children: [
          {
            id: 2,
            label: 'Photo',
            description: 'This item works so well with the other one.',
            image: 'https://picsum.photos/100',
            hasAction: true,
          },
          {
            id: 3,
            label: 'Emoji',
            description: 'This item corresponds the first item perfectly.',
            image: 'https://picsum.photos/100',
            hasAction: true,
          },
          {
            id: 4,
            label: 'Password was updated',
            description: 'This one as well.',
            children: [
              { id: 5, label: 'Node' },
              { id: 6, label: 'It is node also' },
            ],
          },
        ],
      },
      {
        id: 7,
        label: 'Super category',
        children: [
          { id: 8, label: 'Super node' },
          { id: 9, label: 'Common node' },
        ],
      },
    ],
  }),
}
</script>

<style scoped>
.customizable-content b {
  text-transform: uppercase;
}

.customizable-content p {
  color: #767c88;
}
</style>
