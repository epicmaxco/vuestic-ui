<template>
  <h1 class="text-2xl font-bold mb-4">
    Carbon Sequestration Grant
  </h1>

  <VaTabs
    v-model="activeStep"
  >
    <template #tabs>
      <VaTab
        v-for="(step, stepName) in steps"
        :key="stepName"
        :class="['step', { 'has-errors': checkStepValidity(stepName) }]"
        :data-step-valid="step.valid && step.errorCount === 0"
        :data-step-active="activeStep === stepName"
        @click="activeStep = stepName"
      >
        <span
          v-if="checkStepValidity(stepName)"
          class="step--errors"
          v-text="step.errorCount + step.blockingCount"
        />
        <span
          v-else-if="step.valid && step.errorCount === 0"
          class="step--valid"
        >
          <VaIcon size="small" class="material-icons">check</VaIcon>
        </span>
        {{ camel2title(stepName) }}
      </VaTab>
    </template>
  </VaTabs>

  <FormKit
    v-slot="{ state: { valid, loading } }"
    v-model="formValue"
    type="form"
    :plugins="[stepPlugin]"
    :actions="false"
    class="flex flex-col my-4 mx-2"
    @submit="submitApp"
  >
    <section
      v-show="activeStep === 'contactInfo'"
      :class="{ grid: activeStep === 'contactInfo' }"
      class="grid-cols-1 md:grid-cols-3 gap-6"
    >
      <FormKit
        id="contactInfo"
        type="group"
        name="contactInfo"
      >
        <FormKit
          type="text"
          label="*Full name"
          name="full_name"
          placeholder="First Last"
          validation="required"
        />

        <FormKit
          type="email"
          name="email"
          label="*Email address"
          placeholder="email@domain.com"
          validation="required|email"
        />

        <FormKit
          type="tel"
          name="tel"
          label="*Telephone"
          mask="+1 (###) ###-####"
        />
      </FormKit>
    </section>

    <section
      v-show="activeStep === 'organizationInfo'"
      :class="{ grid: activeStep === 'organizationInfo' }"
      class="grid-cols-1 md:grid-cols-3 gap-6"
    >
      <FormKit
        id="organizationInfo"
        type="group"
        name="organizationInfo"
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div>
          <FormKit
            type="text"
            label="*Organization name"
            name="org_name"
            placeholder="MyOrg, Inc."
            help="Enter your official organization name."
            validation="required|length:3"
          />
        </div>
        <div>
          <FormKit
            type="datepicker"
            label="Date of incorporation"
            :validation="date_rule"
            name="date_inc"
          />
        </div>
      </FormKit>
    </section>

    <section
      v-show="activeStep === 'application'"
      :class="{ grid: activeStep === 'application' }"
      class="grid-cols-1 md:grid-cols-3 gap-6"
    >
      <FormKit
        id="application"
        type="group"
        name="application"
      >
        <FormKit
          type="checkbox"
          label="*I'm not a previous grant recipient"
          help="Have you received a grant from us before?"
          name="not_previous_recipient"
          validation="required|accepted"
          :validation-messages="{ accepted: 'We can only give one grant per organization.' }"
        />
        <FormKit
          type="textarea"
          label="*How will you use the money?"
          name="how_money"
          help="Must be between 20 and 500 characters."
          placeholder="Describe how the grant will accelerate your efforts."
          validation="required|length:20,500"
        />
      </FormKit>
    </section>

    <!-- NEW: Adds Next / Previous navigation buttons. -->
    <div class="flex justify-between mt-4">
      <div class="flex gap-3">
        <FormKit
          type="button"
          preset="primary"
          :disabled="activeStep === 'contactInfo'"
          @click="setStep(-1)"
        >
          {{ 'Previous step' }}
        </FormKit>

        <FormKit
          type="button"
          preset="primary"
          class="next"
          :disabled="activeStep === 'application'"
          @click="setStep(1)"
        >
          {{ 'Next step' }}
        </FormKit>
      </div>

      <FormKit type="submit" :disabled="!valid">
        {{ loading ? 'Submitting...' : 'Submit Application' }}
      </FormKit>
    </div>
  </FormKit>

  <VaCollapse
    class="min-w-96 mt-4"
    header="Form data"
  >
    <pre>{{ formValue }}</pre>
  </VaCollapse>
</template>

<script setup>
import { camel2title, axios } from './utils'
import useSteps from './useSteps'

const { steps, visitedSteps, activeStep, setStep, stepPlugin } = useSteps()
const date_rule = [['date_before', new Date(Date.now())]]

// NEW: submit handler, which posts to our fake backend.
const submitApp = async (formData, node) => {
  try {
    await axios.post(formData)
    node.clearErrors()
    alert('Your application was submitted successfully!')
  } catch (err) {
    node.setErrors(err.formErrors, err.fieldErrors)
  }
}

const checkStepValidity = (stepName) => {
  return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
}

const formValue = ref({})
</script>

<style scoped lang="scss">
details {
  border: 1px solid #ccccd7;;
  background: #eeeef4;
  border-radius: .15em;
  padding: 1em;
}

.step {
  position: relative;
  align-items: center;
  display: flex;
  padding: 0 1.5rem;
  background: #eeeef4;
  border-right: 1px solid #ccccd7;
}

[data-step-active="true"] {
  background: white !important;
}

.step--errors,
.step--valid {
  position: absolute;
  top: 4px;
  right: 4px;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 10px;
  background-color: #54A085;
  color: white;
}

.step--errors {
  background-color: #ff4949;
  color: #fff;
  z-index: 100;
}
</style>
