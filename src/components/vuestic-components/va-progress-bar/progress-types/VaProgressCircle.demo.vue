<template>
  <VbDemo>
    <VbCard title="Default">
      <div>
        No value:
        <VaProgressCircle />
      </div>
      <div>
        Value
        <VaProgressCircle :value="value" />
      </div>
    </VbCard>

    <VbCard title="Slotted">
      <div>
        Static slot:
        <VaProgressCircle :value="value">
          Slot
        </VaProgressCircle>
      </div>
      <div>
        Dynamic Slot:
        <VaProgressCircle :value="value">
          {{ value + '%' }}
        </VaProgressCircle>
      </div>
      <div>
        Indeterminate Slot:
        <VaProgressCircle indeterminate>
          {{ value + '%' }}
        </VaProgressCircle>
      </div>
    </VbCard>

    <VbCard title="Colors">
      <VaProgressCircle
        :value="value"
        color="danger"
      />
      <VaProgressCircle
        :value="value"
        color="info"
      />
    </VbCard>

    <VbCard
      refresh
      title="Indeterminate"
    >
      <VaProgressCircle indeterminate />
    </VbCard>

    <VbCard title="Sizes">
      <div>
        30px:
        <VaProgressCircle
          :size="30"
          indeterminate
        />
      </div>
      <div>
        3rem:
        <VaProgressCircle
          size="3rem"
          indeterminate
        />
      </div>
    </VbCard>

    <VbCard title="Thickness">
      <div>
        Thickness 1:
        <VaProgressCircle
          :thickness="1"
          indeterminate
        />
      </div>
      <div>
        Thickness 30:
        <VaProgressCircle
          :thickness="30"
          indeterminate
        />
      </div>
    </VbCard>

    <VbCard title="controls">
      <button @click="value -= 100">
        -100
      </button>
      <button @click="value -= 10">
        -10
      </button>
      {{ value }}
      <button @click="value += 10">
        +10
      </button>
      <button @click="value += 100">
        +100
      </button>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaProgressCircle from './VaProgressCircle'

export default {
  components: {
    VaProgressCircle,
  },
  data () {
    return {
      value: 35,
    }
  },
}
</script>
