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
          :value="value"
        />
      </div>
      <div>
        3rem:
        <VaProgressCircle
          size="3rem"
          :value="value"
        />
      </div>
    </VbCard>

    <VbCard title="Thickness">
      <div>
        Thickness 1:
        <VaProgressCircle
          :thickness="1"
          :value="value"
        />
      </div>
      <div>
        Thickness 30:
        <VaProgressCircle
          :thickness="30"
          :value="value"
        />
      </div>
      <div>
        Thickness 30 + intermediate
        <VaProgressCircle
          :thickness="30"
          indeterminate
        />
      </div>
    </VbCard>

    <VbCard title="context checks">
      <div>
        value:
        <VaContext :config="{VaProgressCircle: {value: 50}}">
          <VaProgressCircle />
        </VaContext>
      </div>
      <div>
        indeterminate:
        <VaContext :config="{VaProgressCircle: {indeterminate: true}}">
          <VaProgressCircle />
        </VaContext>
      </div>
      <div>
        color:
        <VaContext :config="{VaProgressCircle: {color: 'danger'}}">
          <VaProgressCircle :value="value" />
        </VaContext>
      </div>
      <div>
        thickness:
        <VaContext :config="{VaProgressCircle: {thickness: 10}}">
          <VaProgressCircle :value="value" />
        </VaContext>
      </div>
      <div>
        size:
        <VaContext :config="{VaProgressCircle: {size: 30}}">
          <VaProgressCircle :value="value" />
        </VaContext>
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
import VaContext from '../../../context-test/context-provide/VaContext'

export default {
  components: {
    VaContext,
    VaProgressCircle,
  },
  data () {
    return {
      value: 35,
    }
  },
}
</script>
