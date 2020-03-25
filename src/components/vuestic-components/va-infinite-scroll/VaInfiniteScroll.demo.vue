<template>
  <div>
    <VbDemo>
      <VbCard title="Default infinite scroll">
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
      
      <VbCard title="Custom loading scroll">
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
              <va-progress-circle indeterminate :thickness=".5" color="red"></va-progress-circle>
            </template>
          </va-infinite-scroll>
        </div>
      </VbCard>

      <VbCard title="Scroll with offset 200px">
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
      
      <VbCard title="Scroll with ref target">
        <div
          class="scroll__container"
          ref="scrollTarget"
        >
          <va-infinite-scroll
            :scrollTarget="$refs.scrollTarget"
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

      <VbCard title="Scroll with query selector target">
        <div
          class="scroll__container scroll__container--target"
        >
          <va-infinite-scroll
            scrollTarget=".scroll__container--target"
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

      <VbCard title="Scroll with debounce 5000">
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

      <VbCard title="Reversed scroll">
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

      <VbCard title="Disabled scroll">
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
import VaProgressCircle from '../va-progress-bar/progress-types/VaProgressCircle'
import {times} from 'lodash'
import { sleep } from '../../../services/utils'
import VaContext from '../../context-test/context-provide/VaContext'

export default {
  components: {
    VaInfiniteScroll,
    VaProgressCircle,
    VaContext
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
      return times(10,()=> ({ text: 'new record' }))
        .map(record => ({ ...record, id: Math.random() }))
    },
    appendRecords (done) {
      sleep(2000).then(()=>{
        this.records.push(...this.getNewRecords())
        done()})
    },
    prependRecords (done) {
      sleep(20000).then(() => {
        this.reverseRecords.unshift(...this.getNewRecords())
        done()})
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
