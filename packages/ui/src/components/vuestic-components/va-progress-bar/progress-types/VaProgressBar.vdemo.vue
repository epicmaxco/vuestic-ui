<template>
  <VbDemo>
    <VbCard title="Default">
      No value:
      <va-progress-bar />
      <br>
      Default
      <va-progress-bar :modelValue="value" />
      <br>
      Rounded: false
      <va-progress-bar
        :rounded="false"
        :modelValue="value"
      />
    </VbCard>

    <VbCard title="Color">
      Danger color
      <va-progress-bar
        :modelValue="value"
        color="danger"
      />
      <br>
      Custom color
      <va-progress-bar
        :modelValue="value"
        color="purple"
      />
    </VbCard>

    <VbCard title="Size">
      Size small
      <va-progress-bar
        size="small"
        :modelValue="value"
      />
      <br>
      Size large
      <va-progress-bar
        size="large"
        :modelValue="value"
      />
      <br>
      Size 25px
      <va-progress-bar
        :size="25"
        :modelValue="value"
      />
      <br>
      Size rem
      <va-progress-bar
        size="2rem"
        :modelValue="value"
      />
    </VbCard>

    <VbCard title="Slotted">
      Static slot
      <va-progress-bar :modelValue="value">
        Slot
      </va-progress-bar>
      <br>
      Small preset
      <va-progress-bar
        :modelValue="value"
        size="small"
      >
        Slot
      </va-progress-bar>
      <br>
      Large preset
      <va-progress-bar
        :modelValue="value"
        :rounded="false"
        size="large"
      >
        {{ value + '%' }}
      </va-progress-bar>
      <br>
      Dynamic slot
      <va-progress-bar :modelValue="value">
        {{ value + '%' }}
      </va-progress-bar>
    </VbCard>

    <VbCard title="Indeterminate">
      Indeterminate
      <va-progress-bar indeterminate />
    </VbCard>

    <VbCard title="Reverse">
      <va-progress-bar
        :modelValue="value"
        reverse
      />
      <br>
      Buffer
      <va-progress-bar
        :modelValue="value"
        :buffer="60"
        reverse
      />
      <br>
      Indeterminate
      <va-progress-bar
        indeterminate
        reverse
      />
    </VbCard>

    <VbCard
      title="Buffer"
      width="400px"
    >
      Buffer
      <va-progress-bar
        :modelValue="value"
        :buffer="bufferValue"
      />
    </VbCard>

    <VbCard title="context checks">
      <div>
        value:
        <VaContext :config="{VaProgressBar: {value: 50}}">
          <VaProgressBar />
        </VaContext>
      </div>
      <div>
        indeterminate:
        <VaContext :config="{VaProgressBar: {indeterminate: true}}">
          <VaProgressBar />
        </VaContext>
      </div>
      <div>
        color:
        <VaContext :config="{VaProgressBar: {color: 'danger'}}">
          <VaProgressBar :modelValue="80" />
        </VaContext>
      </div>
      <div>
        size:
        <VaContext :config="{VaProgressBar: {size: 30}}">
          <VaProgressBar :modelValue="80" />
        </VaContext>
      </div>
      <div>
        reverse:
        <VaContext :config="{VaProgressBar: {reverse: true}}">
          <VaProgressBar :modelValue="30" />
        </VaContext>
      </div>
      <div>
        rounded (false):
        <VaContext :config="{VaProgressBar: {rounded: false}}">
          <VaProgressBar />
        </VaContext>
      </div>
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
import { VaProgressBar } from '../index'
import VaContext from '../../va-config'

export default {
  components: {
    VaContext,
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
