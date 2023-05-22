<template>
  <VaValue #default="inputText" default-value="Vuestic">
    <div class="preview">
      <VaValue 
        v-for="i in 20" 
        :default-value="{
          left: Math.random() * 80 + 10,
          top: Math.random() * 80 + 10,
          rotate: Math.random() * 360,
          fontSize: Math.random() * 20 + 10,
        }"
        #default="textPosition"
      >
        <span 
          :style="{
            left: `${textPosition.value.left}%`,
            top: `${textPosition.value.top}%`,
            transform: `rotate(${textPosition.value.rotate}deg)`,
            fontSize: `${textPosition.value.fontSize}px`,
          }"
        >
          {{ inputText.value }}
        </span>
      </VaValue>
    </div>

    <VaInput v-model="inputText.value" label="Text" class="mt-2" />
  </VaValue>
</template>

<style lang="scss" scoped>
  .preview {
    position: relative;
    height: 200px;
    background: var(--va-primary);
    span {
      position: absolute;
      color: var(--va-on-primary);
      font-weight: 800;
    }
  }
</style>