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
    </VbCard>

    <VbCard title="Reverse">
      <span
        style="color: tomato;"
        title="Should come from another side"
      >❗❗</span>
      <va-progress-bar
        :value="30"
        reverse
      />
      <br>
      <span
        style="color: tomato;"
        title="Should come from another side"
      >❗❗</span>
      <va-progress-bar
        :value="30"
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
        :value="value"
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
          <VaProgressBar :value="80" />
        </VaContext>
      </div>
      <div>
        size:
        <VaContext :config="{VaProgressBar: {size: 30}}">
          <VaProgressBar :value="80" />
        </VaContext>
      </div>
      <span
        style="color: tomato;"
        title="See reverse card"
      >❗❗</span>
      <div>
        reverse:
        <VaContext :config="{VaProgressBar: {reverse: true}}">
          <VaProgressBar :value="30" />
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
import VaProgressBar from './VaProgressBar'
import VaContext from '../../../context-test/context-provide/VaContext'

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
