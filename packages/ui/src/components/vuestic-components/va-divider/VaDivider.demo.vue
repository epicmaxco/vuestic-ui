<template>
  <VbDemo>
    <VbCard title="default">
      <div class="container">
        <div>
          Item 1
        </div>
        <VaDivider />
        <div>Item 2</div>
      </div>
    </VbCard>

    <VbCard title="only dividers">
      <div class="container">
        <VaDivider />
        <VaDivider />
        <VaDivider />
        <div style="display: flex; height: 40px;">
          <VaDivider vertical />
          <VaDivider vertical />
          <VaDivider vertical />
        </div>
      </div>
    </VbCard>

    <VbCard title="vertical">
      <div class="container">
        <div style="display: flex;">
          <span>Item 1</span>
          <VaDivider vertical />
          <span>Item 2</span>
          <VaDivider vertical />
          <span>Item 3</span>
        </div>
      </div>
    </VbCard>

    <VbCard
      style="width: 300px;"
      title="with text"
    >
      <div class="container">
        <VaDivider>default (center)</VaDivider>
        <VaDivider orientation="left">
          left
        </VaDivider>
        <VaDivider orientation="center">
          center
        </VaDivider>
        <VaDivider orientation="right">
          right
        </VaDivider>
      </div>
    </VbCard>

    <VbCard
      style="width: 300px;"
      title="dashed"
    >
      <div class="container">
        <VaDivider dashed />
        <VaDivider dashed>
          with text
        </VaDivider>
      </div>
    </VbCard>

    <VbCard
      style="width: 300px;"
      title="inset horizontal"
    >
      <div class="container">
        <div>Item 1</div>
        <VaDivider
          inset
          dashed
        />
        <div>Item 2</div>
        <VaDivider
          inset
          dashed
        >
          with text
        </VaDivider>
      </div>
    </VbCard>

    <VbCard
      style="width: 300px;"
      title="inset vertical"
    >
      <div class="container">
        <div style="display: flex; height: 50px;">
          <div>
            Item 1
          </div>
          <VaDivider
            inset
            vertical
          />
          <div>Item 2</div>
          <VaDivider
            dashed
            inset
            vertical
          >
            with text
          </VaDivider>
        </div>
      </div>
    </VbCard>

    <DividerWithList />
  </VbDemo>
</template>

<script>
import VaDivider from './index'
import DividerWithList from './DividerWithList'

export default {
  components: {
    DividerWithList,
    VaDivider,
  },
  data () {
    return {
      isDashed: false,
      isInset: false,
      hasText: false,
      list: [
        { orientation: 'left', text: 'Left text' },
        { orientation: 'center', text: 'Center text' },
        { orientation: 'right', text: 'Right text' },
      ],
    }
  },
}
</script>
<style scoped>
  .container {
    background-color: #f5f8f9;
  }
</style>
