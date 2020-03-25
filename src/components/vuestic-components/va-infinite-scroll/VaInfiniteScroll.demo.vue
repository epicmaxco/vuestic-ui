<template>
  <div>
    <VbDemo>
      <VbCard title="Scroll with custom loading">
        <div
          class="scroll__container"
          ref="scrollContainer"
        >
          <va-infinite-scroll
            :debounce="300"
            :offset="1"
            :scroll-target="$refs.scrollContainer"
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
              <div>Custom loading...</div>
            </template>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="Reversed slider with default spinner">
        <div class="scroll__container query">
          <va-infinite-scroll
            :debounce="300"
            :offset="1"
            scroll-target=".query"
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

      <VbCard title="Disabled data loading">
        <div class="scroll__container disabled">
          <va-infinite-scroll
            :debounce="300"
            :offset="1"
            scroll-target=".disabled"
            disabled
            reverse
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
import {times} from 'lodash'

export default {
  components: {
    VaInfiniteScroll,
  },
  data () {
    return {
      records: times(15, { text: 'record' })
        .map(record => ({ ...record, id: Math.random() })),
      reverseRecords: _.times(15, { text: 'record' })
        .map(record => ({ ...record, id: Math.random() })),
      disabledRecords: _.times(15, { text: 'record' })
        .map(record => ({ ...record, id: Math.random() })),
    }
  },
  methods: {
    getNewRecords () {
      return times(10,{ text: 'new record' })
        .map(record => ({ ...record, id: Math.random() }))
    },
    appendRecords (done) {
      setTimeout(() => {
        this.records.push(...this.getNewRecords())
        done()
      }, 2000)
    },
    prependRecords (done) {
      setTimeout(() => {
        this.reverseRecords.unshift(...this.getNewRecords())
        done()
      }, 2000)
    },
  },
}
</script>
<style scoped lang="scss">

.scroll__container {
  height: 300px;
  width: 200px;
}

</style>
