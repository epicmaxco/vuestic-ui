<template>
  <div>
    <VbDemo>
      <VbCard title="Default">
        <div
          class="scroll__container"
        >
          <va-infinite-scroll
            @load="appendRecords"
          >
            <ul>
              <li
                v-for="(record, index) in records"
                :key="record.id"
              >
                {{ record.text }} #{{ index }}
              </li>
            </ul>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="Custom loading slot">
        <div
          class="scroll__container"
        >
          <va-infinite-scroll
            @load="appendRecords"
          >
            <ul>
              <li
                v-for="(record, index) in records"
                :key="record.id"
              >
                {{ record.text }} #{{ index }}
              </li>
            </ul>
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
            @load="appendRecords"
          >
            <ul>
              <li
                v-for="(record, index) in records"
                :key="record.id"
              >
                {{ record.text }} #{{ index }}
              </li>
            </ul>
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
            @load="appendRecords"
          >
            <ul>
              <li
                v-for="(record, index) in records"
                :key="record.id"
              >
                {{ record.text }} #{{ index }}
              </li>
            </ul>
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
            @load="appendRecords"
          >
            <ul>
              <li
                v-for="(record, index) in records"
                :key="record.id"
              >
                {{ record.text }} #{{ index }}
              </li>
            </ul>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="debounce">
        <div
          class="scroll__container"
        >
          <va-infinite-scroll
            :debounce="5000"
            @load="appendRecords"
          >
            <ul>
              <li
                v-for="(record, index) in records"
                :key="record.id"
              >
                {{ record.text }} #{{ index }}
              </li>
            </ul>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="reverse">
        <div class="scroll__container">
          <va-infinite-scroll
            reverse
            @load="prependRecords"
          >
            <ul>
              <li
                v-for="(record, index) in reverseRecords"
                :key="record.id"
              >
                {{ record.text }} #{{ index }}
              </li>
            </ul>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="disabled">
        <div class="scroll__container">
          <va-infinite-scroll
            disabled
            @load="prependRecords"
          >
            <ul>
              <li
                v-for="(record, index) in disabledRecords"
                :key="record.id"
              >
                {{ record.text }} #{{ index }}
              </li>
            </ul>
          </va-infinite-scroll>
        </div>
      </VbCard>
    </VbDemo>
  </div>
</template>

<script>
import VaInfiniteScroll from './VaInfiniteScroll'
import VaProgressCircle
  from '../va-progress-bar/progress-types/VaProgressCircle'
import { times } from 'lodash'
import { sleep } from '../../../services/utils'

export default {
  components: {
    VaInfiniteScroll,
    VaProgressCircle,
  },
  data () {
    return {
      records: times(20, () => ({ text: 'record', id: Math.random() })),
      reverseRecords: times(20, () => ({ text: 'record', id: Math.random() })),
      disabledRecords: times(20, () => ({ text: 'record', id: Math.random() })),
    }
  },
  methods: {
    getNewRecords () {
      return times(10, () => ({ text: 'new record' }))
        .map(record => ({ ...record, id: Math.random() }))
    },
    appendRecords (done) {
      sleep(2000).then(() => {
        this.records.push(...this.getNewRecords())
        done()
      })
    },
    prependRecords (done) {
      sleep(2000).then(() => {
        this.records.push(...this.getNewRecords())
        done()
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
