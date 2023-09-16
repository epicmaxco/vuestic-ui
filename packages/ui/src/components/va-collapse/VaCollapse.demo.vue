<template>
  <VbDemo>
    <VbCard title="Default">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
      >
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
    </VbCard>

    <VbCard title="Solid">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        solid
      >
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
    </VbCard>

    <VbCard title="Disabled">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        disabled
      >
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
    </VbCard>

    <VbCard title="Color">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        color="success"
      >
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        solid
        color="warning"
      >
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        solid
        color="danger"
        color-all
      >
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        solid
        color="#000"
        color-all
        text-color="backgroundPrimary"
        icon="info"
      >
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
    </VbCard>

    <VbCard title="Icon">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        icon="home"
      >
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
    </VbCard>

    <VbCard title="Layers">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
      >
        <template #body>
          <va-collapse
            v-for="(value, index) in collapseLayerValue"
            :key="index"
            v-model="collapseLayerValue[index]"
            :header="collapseHeader"
            color="background-element"
          >
            <template #body>
              <va-collapse
                v-for="(value, index) in collapseSecondLayerValue"
                :key="index"
                v-model="collapseSecondLayerValue[index]"
                :header="collapseHeader"
                color="secondary"
              >
                <template #content>
                  {{ collapseContent }}
                </template>
              </va-collapse>
            </template>
          </va-collapse>
        </template>
      </va-collapse>
    </VbCard>

    <VbCard title="Custom header">
      <va-collapse v-model="collapseValue" style="width: 400px;">
        <template #header="{ value }">
          <button style="width: 100%;">
            {{ collapseHeader }} ({{ value ? 'opened' : 'closed' }})
          </button>
        </template>

        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
    </VbCard>

    <VbCard title="Stateful">
      <va-collapse stateful style="width: 400px;" :header="collapseHeader">
        <template #content>
          {{ collapseContent }}
        </template>
      </va-collapse>
    </VbCard>

    <VbCard title="Dynamic content">
      <va-collapse stateful style="width: 400px;" :header="collapseHeader">
        <template #header="{ value }">
          <div>
            {{ collapseHeader }} ({{ value ? 'opened' : 'closed' }})
            <button @click.stop="items.push('Item ' + items.length)">
              Add item
            </button>
          </div>
        </template>

        <div class="collapse-content" v-for="item in items" :key="item">
          {{ item }}
        </div>
      </va-collapse>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCollapse from './VaCollapse.vue'

export default {
  components: {
    VaCollapse,
  },
  data () {
    return {
      collapseValue: false,
      collapseLayerValue: [false, false, false],
      collapseSecondLayerValue: [false, false, false],
      collapseHeader: 'Expand This Block',
      collapseContent: 'Expand content',
      items: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.collapse-content {
  padding: 1rem;
}
</style>
