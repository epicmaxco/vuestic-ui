<template>
  <va-card color="background" style="padding: 0.75rem;">
    <div class="layout gutter--1">
      <div class="row">
        <div class="flex xs6">
          <div class="item">gutter--1</div>
        </div>
        <div class="flex xs6">
          <div class="item">gutter--1</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout gutter--2">
      <div class="row">
        <div class="flex xs6">
          <div class="item">gutter--2</div>
        </div>
        <div class="flex xs6">
          <div class="item">gutter--2</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout gutter--3">
      <div class="row">
        <div class="flex xs6">
          <div class="item">gutter--3</div>
        </div>
        <div class="flex xs6">
          <div class="item">gutter--3</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout gutter--4">
      <div class="row">
        <div class="flex xs6">
          <div class="item">gutter--4</div>
        </div>
        <div class="flex xs6">
          <div class="item">gutter--4</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout gutter--5">
      <div class="row">
        <div class="flex xs6">
          <div class="item">gutter--5</div>
        </div>
        <div class="flex xs6">
          <div class="item">gutter--5</div>
        </div>
      </div>
    </div>
  </va-card>
</template>

<script>
import VaCard from 'vuestic-ui/src/components/va-card/VaCard'
export default {
  components: { VaCard },
}
</script>

<style lang="scss" scoped>
@import '~vuestic-ui/src/styles/resources';

.layout {
  background-color: $lighter-gray;
}

.item {
  border: 1px solid $gray;
  background-color: $white;
  text-align: center;
}
</style>
