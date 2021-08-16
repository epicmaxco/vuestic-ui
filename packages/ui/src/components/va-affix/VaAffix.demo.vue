<template>
  <VbDemo ref="container">
    <VbCard
      title="Fixed at the top"
    >
      <p class="demo-content">{{$vb.lorem(100)}}</p>
      <VaAffix :offset-top="100">
        <div class="demo-affix">Fixed at the top: 100</div>
      </VaAffix>
      <p class="demo-content">{{$vb.lorem(2500)}}</p>
    </VbCard>
    <VbCard
      title="Fixed at the bottom"
    >
      <p class="demo-content">{{$vb.lorem(2500)}}</p>
      <VaAffix :offset-bottom="50">
        <div class="demo-affix">Fixed at the bottom: 50</div>
      </VaAffix>
      <p class="demo-content">{{$vb.lorem(100)}}</p>
    </VbCard>
    <VbCard
      title="Affixed state change"
    >
      <p class="demo-content">{{$vb.lorem(100)}}</p>
      <VaAffix :offset-top="0" @change="handleAffixedStateChange">
        <div class="demo-affix">Fixed at the top: 0</div>
        <div class="demo-affix" style="font-weight: bold;">Affixed state: {{ affixedState }}</div>
      </VaAffix>
      <p class="demo-content">{{$vb.lorem(2500)}}</p>
    </VbCard>
    <VbCard
      title="Custom target"
    >
      <div class="demo-target" ref="customTarget">
        <p class="demo-content">{{$vb.lorem(1000)}}</p>
        <VaAffix :target="getTarget" :offset-bottom="0" :offset-top="50">
          <div class="demo-affix">Fixed at custom position</div>
        </VaAffix>
        <p class="demo-content">{{$vb.lorem(1000)}}</p></div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaAffix from './index'

export default {
  components: {
    VaAffix,
  },
  data () {
    return {
      customTarget: undefined,
      affixedState: false,
    }
  },
  mounted () {
    this.customTarget = document.querySelector('.demo-target')
  },
  methods: {
    getTarget () {
      return this.$refs.customTarget
    },
    handleAffixedStateChange (value) {
      this.affixedState = value
    },
  },
}
</script>

<style scoped>
.VbCard {
  width: 23%;
}

.demo-affix {
  padding: 10px 30px;
  background-color: lightblue;
}

.demo-content {
  margin: 1rem 0;
}

.demo-target {
  height: 500px;
  margin: 10rem 0;
  overflow-y: scroll;
}
</style>
