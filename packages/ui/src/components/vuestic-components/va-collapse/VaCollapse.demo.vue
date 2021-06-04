<template>
  <VbDemo>
    <VbCard title="Default">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
      >
        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>

    <VbCard title="Solid">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        solid
      >
        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>

    <VbCard title="Disabled">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        disabled
      >
        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>

    <VbCard title="Color">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        color="success"
      >
        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        solid
        color="warning"
      >
        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        solid
        color="danger"
        color-all
      >
        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        solid
        color="#000"
        color-all
        text-color="white"
        icon="info"
      >
        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>

    <VbCard title="Icon">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
        icon="home"
      >
        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>

    <VbCard title="Layers">
      <va-collapse
        v-model="collapseValue"
        style="width: 400px;"
        :header="collapseHeader"
      >
        <div class="collapse-content">
          <va-collapse
            v-for="(value, index) in collapseLayerValue"
            :key="index"
            v-model="collapseLayerValue[index]"
            :header="collapseHeader"
          >
            <div class="collapse-content">
              <va-collapse
                v-for="(value, index) in collapseSecondLayerValue"
                :key="index"
                v-model="collapseSecondLayerValue[index]"
                :header="collapseHeader"
              >
                <div class="collapse-content">
                  {{ collapseContent }}
                </div>
              </va-collapse>
            </div>
          </va-collapse>
        </div>
      </va-collapse>
    </VbCard>

    <VbCard title="Custom header">
      <va-collapse v-model="collapseValue" style="width: 400px;">
        <template #header>
          <button style="width: 100%;">
            {{ collapseHeader }}
          </button>
        </template>

        <div class="collapse-content">
          {{ collapseContent }}
        </div>
      </va-collapse>
    </VbCard>

    <VbCard title="Stateful">
      <va-collapse stateful style="width: 400px;" :header="collapseHeader">
        <div class="collapse-content">
          {{ collapseContent }}
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
    }
  },
}
</script>

<style lang="scss" scoped>
.collapse-content {
  padding: 1rem;
}
</style>
