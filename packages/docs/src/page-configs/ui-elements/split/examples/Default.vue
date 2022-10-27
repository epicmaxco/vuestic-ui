<template>
  <va-split class="split-demo split-demo--image" :limits="[10, 10]">
    <template #start="{ containerSize }">
      <div class="img-block">
        <img src="https://picsum.photos/seed/picsum/1536/800" :style="{ width: `${containerSize}px` }" draggable="false" class="img img--start" alt="" />
      </div>
    </template>
    <template #end="{ containerSize }">
      <div class="img-block">
        <img src="https://picsum.photos/seed/picsum/1536/800?grayscale" :style="{ width: `${containerSize}px` }" draggable="false" class="img img--end" alt="" />
      </div>
    </template>
  </va-split>
</template>

<style lang="scss" scoped>
.split-demo {
  position: relative;
  height: 33rem;

  & .img-block {
    position: relative;
    height: 100%;
    overflow: hidden;
    user-select: none;
  }

  .img {
    position: absolute;
    top: 0;
    width: 67vw;

    &--start {
      left: 0;
    }

    &--end {
      right: 0;
    }
  }
}
</style>
