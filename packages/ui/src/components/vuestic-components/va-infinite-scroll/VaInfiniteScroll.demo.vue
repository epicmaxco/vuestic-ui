<template>
  <div>
    <VbDemo>
      <VbCard title="Default">
        <div
          class="scroll__container"
        >
          <va-infinite-scroll
            :load="appendRecordsAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="Custom loading slot">
        <div
          class="scroll__container"
        >
          <va-infinite-scroll
            :load="appendRecordsAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
            <template #loading>
              <va-progress-circle
                indeterminate
                :thickness=".5"
                color="red"
              />
            </template>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="Offset 200px">
        <div
          class="scroll__container"
        >
          <va-infinite-scroll
            :offset="200"
            :load="appendRecordsAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="ref target">
        <div
          class="scroll__container"
          ref="scrollTarget"
        >
          <va-infinite-scroll
            :scroll-target="$refs.scrollTarget"
            :load="appendRecordsAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="selector target">
        <div
          id="target"
          class="scroll__container"
        >
          <va-infinite-scroll
            scroll-target="#target"
            :load="appendRecordsAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="ul tag">
        <div
          tag="ul"
          class="scroll__container"
        >
          <va-infinite-scroll
            :load="appendRecordsAsync"
          >
            <li
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </li>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="debounce">
        <div
          class="scroll__container"
        >
          <va-infinite-scroll
            :debounce="5000"
            :load="appendRecordsAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="load failed">
        <div
          class="scroll__container"
        >
          <va-infinite-scroll
            :load="failedLoadAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="reverse">
        <div class="scroll__container">
          <va-infinite-scroll
            reverse
            :load="appendRecordsAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="disabled">
        <va-checkbox v-model="disabled" label="Disabled" />
        <div class="scroll__container">
          <va-infinite-scroll
            :disabled="disabled"
            :load="appendRecordsAsync"
          >
            <div
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </div>
          </va-infinite-scroll>
        </div>
      </VbCard>
    </VbDemo>
  </div>
</template>

<script>
import VaInfiniteScroll from './index'
import VaCheckbox from '../va-checkbox'
import { VaProgressCircle } from '../va-progress-bar'
import { getNewRecords, getInitialRecords } from '../../../data/Records'
import { sleep } from '../../../services/utils'

export default {
  components: {
    VaInfiniteScroll,
    VaProgressCircle,
    VaCheckbox,
  },
  data () {
    return {
      disabled: false,
      records: getInitialRecords(),
      disabledRecords: getInitialRecords(),
    }
  },
  methods: {
    async appendRecordsAsync () {
      await sleep(2000)
      this.records.push(...getNewRecords())
    },
    async failedLoadAsync () {
      await sleep(2000)
      throw Error('qweqwe')
    },
  },
}
</script>
<style scoped lang="scss">
.scroll__container {
  height: 400px;
  width: 200px;
}
</style>
