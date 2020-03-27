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
            <li
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </li>
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
            <li
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </li>
            <template v-slot:loading>
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
            <li
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </li>
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
            <li
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </li>
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
            <li
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </li>
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
            <li
              v-for="(record, index) in records"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </li>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="reverse">
        <div class="scroll__container">
          <va-infinite-scroll
            reverse
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

      <VbCard title="disabled">
        <div class="scroll__container">
          <va-infinite-scroll
            disabled
            :load="appendRecordsAsync"
          >
            <li
              v-for="(record, index) in disabledRecords"
              :key="record.id"
            >
              {{ record.text }} #{{ index }}
            </li>
          </va-infinite-scroll>
        </div>
      </VbCard>
    </VbDemo>
  </div>
</template>

<script>
import VaInfiniteScroll from './VaInfiniteScroll'
import VaProgressCircle from '../va-progress-bar/progress-types/VaProgressCircle'
import { times } from 'lodash'
import { sleep } from '../../../services/utils'

export default {
  components: {
    VaInfiniteScroll,
    VaProgressCircle,
  },
  data () {
    return {
      records: this.getInitialRecords(),
      disabledRecords: this.getInitialRecords(),
    }
  },
  methods: {
    getInitialRecords () {
      return times(20, () => ({ text: 'record', id: Math.random() }))
    },
    getNewRecords () {
      return times(10, () => ({ text: 'new record' })).map(record => ({
        ...record,
        id: Math.random(),
      }))
    },
    appendRecordsAsync () {
      return sleep(2000).then(() => {
        this.records.push(...this.getNewRecords())
      })
    },
    failedLoadAsync () {
      return sleep(2000).then(() => {
        throw Error('qweqwe')
      })
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
