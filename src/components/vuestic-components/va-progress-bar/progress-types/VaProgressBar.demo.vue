<template>
  <VbDemo>
    <VbCard title="Default">
      No value:
      <va-progress-bar />
      <br>
      Default
      <va-progress-bar :value="value" />
      <br>
      Rounded: false
      <va-progress-bar
        :rounded="false"
        :value="value"
      />
    </VbCard>

    <VbCard title="Color">
      Danger color
      <va-progress-bar
        :value="value"
        color="danger"
      />
      <br>
      Custom color
      <va-progress-bar
        :value="value"
        color="purple"
      />
    </VbCard>

    <VbCard title="Size">
      Size small
      <va-progress-bar
        size="small"
        :value="value"
      />
      <br>
      Size large
      <va-progress-bar
        size="large"
        :value="value"
      />
      <br>
      Size 25px
      <va-progress-bar
        :size="25"
        :value="value"
      />
      <br>
      Size rem
      <va-progress-bar
        size="2rem"
        :value="value"
      />
    </VbCard>

    <VbCard title="Slotted">
      Static slot
      <va-progress-bar :value="value">
        Slot
      </va-progress-bar>
      <br>
      Small preset
      <va-progress-bar
        :value="value"
        size="small"
      >
        Slot
      </va-progress-bar>
      <br>
      Large preset
      <va-progress-bar
        :value="value"
        :rounded="false"
        size="large"
      >
        {{ value + '%' }}
      </va-progress-bar>
      <br>
      Dynamic slot
      <va-progress-bar :value="value">
        {{ value + '%' }}
      </va-progress-bar>
    </VbCard>

    <VbCard title="Indeterminate">
      Indeterminate
      <va-progress-bar indeterminate />
      <br>
      Indeterminate Reversed
      <va-progress-bar
        reverse
        indeterminate
      />
    </VbCard>
    <VbCard
      title="Buffer"
      width="400px"
    >
      Buffer
      <va-progress-bar
        :value="value"
        :buffer="bufferValue"
      />
    </VbCard>

    <VbCard title="Controls">
      Values:
      <div>
        <button @click="value -= 100">
          -100
        </button>
        <button @click="value -= 10">
          -10
        </button>
        <input
          style="width: 50px;"
          type="number"
          v-model.number="value"
        >
        <button @click="value += 10">
          +10
        </button>
        <button @click="value += 100">
          +100
        </button>
      </div>
      <br>
      Buffer values:
      <div>
        <button @click="bufferValue -= 100">
          -100
        </button>
        <button @click="bufferValue -= 10">
          -10
        </button>
        <input
          style="width: 50px;"
          type="number"
          v-model.number="bufferValue"
        >
        <button @click="bufferValue += 10">
          +10
        </button>
        <button @click="bufferValue += 100">
          +100
        </button>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaProgressBar from './VaProgressBar'

export default {
  components: {
    VaProgressBar,
  },
  data () {
    return {
      bufferValue: 45,
      value: 35,
    }
  },
}
</script>
