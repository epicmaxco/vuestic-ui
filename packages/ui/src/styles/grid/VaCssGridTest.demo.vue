<template>
  <div class="grid-demo">
    <div class="layout va-gutter-3">
      <div class="row">
        <div class="flex">
          Spacings between items in the block
        </div>
      </div>
      <div class="row mb-3">
        <span v-for="i in 5" :key="i" class="_blue-rectangle">no spacing</span>
      </div>
      <div class="row va-spacing-x-1 mb-3">
        <span v-for="i in 5" :key="i" class="_blue-rectangle">va-spacing-x-1</span>
      </div>
      <div class="row va-spacing-x-2 mb-3">
        <span v-for="i in 5" :key="i" class="_blue-rectangle">va-spacing-x-2</span>
      </div>
      <div class="row va-spacing-x-3 mb-3">
        <span v-for="i in 5" :key="i" class="_blue-rectangle">va-spacing-x-3</span>
      </div>
      <div class="row va-spacing-x-4 mb-3">
        <span v-for="i in 5" :key="i" class="_blue-rectangle">va-spacing-x-4</span>
      </div>
      <div class="row va-spacing-x-5 mb-3">
        <span v-for="i in 5" :key="i" class="_blue-rectangle">va-spacing-x-5</span>
      </div>
    </div>
    <div class="layout va-gutter-3">
      <div class="row">
        <div class="flex">
          Grid sizes
        </div>
      </div>
      <div class="row">
        <div class="flex xs12">
          <div class="_blue-rectangle">
            12
          </div>
        </div>
        <div
          class="flex xs6"
          v-for="i in 2"
          :key="`6${i}`"
        >
          <div class="_blue-rectangle">
            6
          </div>
        </div>
        <div
          class="flex xs4"
          v-for="i in 3"
          :key="`4${i}`"
        >
          <div class="_blue-rectangle">
            4
          </div>
        </div>
        <div
          class="flex xs3"
          v-for="i in 4"
          :key="`3${i}`"
        >
          <div class="_blue-rectangle">
            3
          </div>
        </div>
        <div
          class="flex xs2"
          v-for="i in 6"
          :key="`2${i}`"
        >
          <div class="_blue-rectangle">
            2
          </div>
        </div>
        <div
          class="flex xs1"
          v-for="i in 12"
          :key="`1${i}`"
        >
          <div class="_blue-rectangle">
            1
          </div>
        </div>
      </div>
    </div>

    <div class="layout">
      <div class="row">
        <div class="flex">
          Orders
        </div>
      </div>
      <div class="row">
        <div class="flex xs1 order-md3 order-lg2">
          <div class="_blue-rectangle">
            First
          </div>
        </div>
        <div class="flex xs1 order-md1 order-lg3">
          <div class="_blue-rectangle">
            Second
          </div>
        </div>
        <div class="flex xs1 order-md2 order-lg1">
          <div class="_blue-rectangle">
            Last
          </div>
        </div>
      </div>
    </div>

    <div class="layout">
      <div class="row">
        <div class="flex">
          Offsets
        </div>
      </div>
      <div class="row">
        <div class="flex xs1 offset-md3 offset-lg2">
          <div class="_blue-rectangle">
            First
          </div>
        </div>
        <div class="flex xs1 offset-md1 offset-lg3">
          <div class="_blue-rectangle">
            Second
          </div>
        </div>
        <div class="flex xs1 offset-md2 offset-lg1">
          <div class="_blue-rectangle">
            Last
          </div>
        </div>
      </div>
    </div>

    <div class="layout">
      <div class="row">
        <div class="flex">
          No gutter container
        </div>
      </div>
      <div class="row">
        <div
          class="flex xs2"
          v-for="i in 6"
          :key="`2${i}`"
        >
          <div class="_blue-rectangle">
            2
          </div>
        </div>
      </div>
    </div>

    <div class="layout va-gutter-1">
      <div class="row">
        <div class="flex">
          xs gutter
        </div>
      </div>
      <div class="row">
        <div
          class="flex xs2"
          v-for="i in 6"
          :key="`2${i}`"
        >
          <div class="_blue-rectangle">
            2
          </div>
        </div>
      </div>
    </div>

    <div class="layout va-gutter-2">
      <div class="row">
        <div class="flex">
          sm gutter
        </div>
      </div>
      <div class="row">
        <div
          class="flex xs2"
          v-for="i in 6"
          :key="`2${i}`"
        >
          <div class="_blue-rectangle">
            2
          </div>
        </div>
      </div>
    </div>

    <div class="layout va-gutter-2">
      <div class="row">
        <div class="flex">
          sm gutter
        </div>
      </div>
      <div class="row">
        <div
          class="flex xs2"
          v-for="i in 6"
          :key="`2${i}`"
        >
          <div class="_blue-rectangle">
            2
          </div>
        </div>
      </div>
    </div>

    <div class="layout va-gutter-3">
      <div class="row">
        <div class="flex">
          md gutter
        </div>
      </div>
      <div class="row">
        <div
          class="flex xs2"
          v-for="i in 6"
          :key="`2${i}`"
        >
          <div class="_blue-rectangle">
            2
          </div>
        </div>
      </div>
    </div>

    <div class="layout va-gutter-4">
      <div class="row">
        <div class="flex">
          lg gutter
        </div>
      </div>
      <div class="row">
        <div
          class="flex xs2"
          v-for="i in 6"
          :key="`2${i}`"
        >
          <div class="_blue-rectangle">
            2
          </div>
        </div>
      </div>
    </div>

    <div class="layout va-gutter-5">
      <div class="row">
        <div class="flex">
          xl gutter
        </div>
      </div>
      <div class="row">
        <div
          class="flex xs2"
          v-for="i in 6"
          :key="`2${i}`"
        >
          <div class="_blue-rectangle">
            2
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../resources';
  @import 'grid-global-styles';

  .grid-demo {
    & ._blue-rectangle {
      background-color: #b6ecff;
      border: 1px solid #738dff;
    }
  }
</style>
