<template>
  <VbDemo>
    <VbCard title="V reactive">
      <VaValue #default="v">
        <button @click="v.value = !v.value">
          {{ v.value ? 'clicked' : 'unclicked' }}
        </button>
      </VaValue>
    </VbCard>
    <VbCard title="Show/Hide">
      <VaValue #default="v">
        <div>
          <button @click="v.value = !v.value">
            {{ v.value ? 'Hide' : 'Show' }}
          </button>
          <div style="position: relative;">
            <div style="height: 24px; overflow: hidden; max-width: 160px;">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eaque deserunt maiores voluptatibus vitae hic ullam, asperiores, veritatis voluptatem eum obcaecati saepe quibusdam libero porro dolores et nobis! Possimus, labore?
            </div>
            <div v-if="v.value" style="position: absolute; background: white; top: 0;">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eaque deserunt maiores voluptatibus vitae hic ullam, asperiores, veritatis voluptatem eum obcaecati saepe quibusdam libero porro dolores et nobis! Possimus, labore?
            </div>
          </div>
        </div>
      </VaValue>
    </VbCard>
    <VbCard title="Expand input">
      <VaValue #default="v">
        <div style="height: 24px; position: relative;">
          <input
            :value="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eaque deserunt maiores voluptatibus vitae hic ullam, asperiores, veritatis voluptatem eum obcaecati saepe quibusdam libero porro dolores et nobis! Possimus, labore?'"
            :style="{ width: v.value ? '200px' : '100%' }"
            style="height: 24px; position: absolute;"
            @focus="v.value = true"
            @blur="v.value = false"
          />
        </div>
      </VaValue>
    </VbCard>
  </VbDemo>
</template>

<script setup>
import VaValue from './VaValue.vue'
</script>

<style lang="scss" scoped>
.target {
  width: 300px;
  background-color: #eeeeee;
  height: 100px;
}
</style>
