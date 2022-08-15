<template>
  <p>List of video game genres:</p>
  <va-tree-view :nodes="nodes" />
</template>

<script>
export default {
  name: 'Default',

  data: () => ({
    nodes: [
      {
        label: 'Action',
        icon: 'healing',
        children: [
          { label: 'Platform games' },
          { label: 'Shooter games' },
          { label: 'Fighting games' },
        ],
      },
      {
        label: 'Adventure',
        icon: 'interests',
        children: [
          { label: 'Text adventures' },
          { label: 'Graphic adventures' },
          { label: 'Visual novels' },
        ],
      },
      {
        label: 'Puzzle',
        icon: 'extension',
        children: [
          { label: 'Breakout clone game' },
          {
            label: 'Logical game',
            children: [
              { label: 'Physics game' },
            ],
          },
        ],
      },
      {
        label: 'Strategy',
        icon: 'fort',
        children: [
          { label: 'Real-time strategy (RTS)' },
          { label: 'Real-time tactics (RTT)' },
          { label: 'Tower defense' },
          { label: 'Turn-based strategy (TBS)' },
          { label: 'Turn-based tactics (TBT)' },
        ],
      },
      {
        label: 'Sports',
        icon: 'pool',
        children: [
          { label: 'Racing' },
          { label: 'Sports game' },
          { label: 'Competitive' },
          { label: 'Sports-based fighting' },
        ],
      },
      { label: 'Simulation', icon: 'motorcycle' },
      { label: 'MMO', icon: 'groups' },
    ],
  }),
}
</script>

<style scoped>

</style>
