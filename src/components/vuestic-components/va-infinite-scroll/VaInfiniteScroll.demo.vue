<template>
  <div>
    <VbDemo>
      <VbCard>
        <div class="scroll__container ref" ref="scrollContainer">
          <VaInfiniteScroll
            :debounce="300"
            :offset="1"
            :scroll-target="$refs.scrollContainer"
            @load="appendRecords"
          >
            <ul>
              <li v-for="(record, index) in records" :key="record.id">{{record.text}} #{{index}}</li>
            </ul>
            <template v-slot:loading>
              <spring-spinner :animation-duration="2000" :size="48" :color="$themes.primary" />
            </template>
          </VaInfiniteScroll>
        </div>
      </VbCard>

      <VbCard>
        <div class="scroll__container query">
          <VaInfiniteScroll
            :debounce="300"
            :offset="1"
            :scroll-target="'.query'"
            reverse
            @load="prependRecords"
          >
            <ul>
              <li
                v-for="(record, index) in reverseRecords"
                :key="record.id"
              >{{record.text}} #{{index}}</li>
            </ul>
          </VaInfiniteScroll>
        </div>
      </VbCard>

      <VbCard>
        <div class="scroll__container disabled">
          <VaInfiniteScroll
            :debounce="300"
            :offset="1"
            :scroll-target="'.disabled'"
            :disabled="disabled"
            reverse
            @load="prependRecords"
          >
            <ul>
              <li
                v-for="(record, index) in disabledRecords"
                :key="record.id"
              >{{record.text}} #{{index}}</li>
            </ul>
          </VaInfiniteScroll>
        </div>
      </VbCard>
    </VbDemo>
  </div>
</template>

<script>
import VaInfiniteScroll from "./VaInfiniteScroll";
import { SpringSpinner } from "epic-spinners";

export default {
  components: {
    VaInfiniteScroll,
    SpringSpinner
  },
  data() {
    return {
      records: new Array(15)
        .fill({ text: "record" })
        .map(record => ({ ...record, id: Math.random() })),
      reverseRecords: new Array(15)
        .fill({ text: "record" })
        .map(record => ({ ...record, id: Math.random() })),
      disabledRecords: new Array(15)
        .fill({ text: "record" })
        .map(record => ({ ...record, id: Math.random() })),
      disabled: true
    };
  },
  methods: {
    getNewRecords() {
      return new Array(10)
        .fill({ text: "new record" })
        .map(record => ({ ...record, id: Math.random() }));
    },
    appendRecords(done) {
      setTimeout(() => {
        this.records.push(...this.getNewRecords());
        done();
      }, 2000);
    },
    prependRecords(done) {
      setTimeout(() => {
        this.reverseRecords.unshift(...this.getNewRecords());
        done();
      }, 2000);
    }
  }
};
</script>
<style lang="scss">
.scroll__container {
  height: 300px;
  width: 200px;
}
</style>
