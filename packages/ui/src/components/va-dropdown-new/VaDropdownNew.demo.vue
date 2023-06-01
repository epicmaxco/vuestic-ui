<template>
  <VbDemo>
    <VbCard title="Default">
      <va-dropdown-new>
        <template #anchor>
          Hi
        </template>
        Dropdown
      </va-dropdown-new>
    </VbCard>
    <br />
    <VbCard title="Big">
      <div class="overflow-hidden">
        <div
          class="scroll-container"
          ref="targetBig"
        >
          <div class="content-container">
            <div class="vertical-space"></div>
            <va-dropdown-new
              :target="targetBig"
            >
              <template #anchor>
                <div class="scrollable"></div>
              </template>
              Dropdown
            </va-dropdown-new>
            <div class="vertical-space"></div>
          </div>
        </div>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import { ref } from 'vue'
import VaDropdownNew from './VaDropdownNew.vue'

export default {
  components: {
    VaDropdownNew,
  },
  setup () {
    return {
      targetBig: ref(null),
    }
  },
}
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}

.scroll-container {
  width: 500px;
  height: 300px;
  overflow: auto;
  position: relative;
  border: 1px dashed black;
}

.content-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.vertical-space {
  height: 400px;
}

.scrollable {
  width: 80px;
  height: 80px;
  border: 1px dashed black;
}
</style>
