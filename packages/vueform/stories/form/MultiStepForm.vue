<template>
  <VaStepper :steps="steps" linear stateful @finish="onFinish">
    <template #step-content-0>
      <Vueform ref="formRef0" v-model="formdata0" sync>
        <template #empty>
          <VaInputElement name="email" placeholder="Email address" rules="required|email|max:255" :debounce="300">
            <template #label>
              Your email
            </template>
          </VaInputElement>
          <VaInputElement name="userName" messages="Pick a username people will remember!" rules="required|min:3">
            <template #label>
              Your username
            </template>
          </VaInputElement>
        </template>
      </Vueform>
    </template>

    <template #step-content-1>
      <Vueform ref="formRef1" v-model="formdata1" sync>
        <template #empty>
          <VaInputElement name="Name" placeholder="Name" rules="required|max:255">
            <template #label>
              Name
            </template>
          </VaInputElement>
        </template>
      </Vueform>
    </template>


    <template #step-content-2>
      <Vueform ref="formRef2" v-model="formdata2" sync>
        <template #empty>
          <VaInputElement name="GitHub" placeholder="GitHub" rules="required|url">
            <template #label>
              GitHub
            </template>
          </VaInputElement>
        </template>
      </Vueform>
    </template>
  </VaStepper>
</template>


<script setup>
import { ref } from 'vue';
import { VaStepper, defineVaStepperSteps } from 'vuestic-ui'

const formRef0 = ref(null)
const formdata0 = ref({})


const formRef1 = ref(null)
const formdata1 = ref({})


const formRef2 = ref(null)
const formdata2 = ref({})

const steps = ref(defineVaStepperSteps([
  {
    label: 'Account',
    beforeLeave: async (step) => {
      await formRef0.value.validate()
      step.hasError = formRef0.value.invalid
    },
  },
  {
    label: 'Personal',
    beforeLeave: async (step) => {
      await formRef1.value.validate()
      step.hasError = formRef1.value.invalid
    },
  },
  {
    label: 'Social',
    beforeLeave: async (step) => {
      await formRef2.value.validate()
      step.hasError = formRef2.value.invalid
    },
  },
]))

function onFinish() {
  alert('Done!')
}
</script>
