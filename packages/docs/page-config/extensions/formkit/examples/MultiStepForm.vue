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
          <VaIcon size="14px" class="material-icons">check</VaIcon>
        </span>
        {{ camel2title(stepName) }}
      </VaTab>
    </template>
  </VaTabs>

  <FormKit
    v-slot="{ value, state: { valid, loading } }"
    :type="types.form"
    :plugins="[stepPlugin]"
    :actions="false"
    class="flex flex-col items-baseline gap-6 py-6"
    @submit="submitApp"
  >
    <section
      v-show="activeStep === 'contactInfo'"
      class="flex-col items-baseline gap-6"
      :class="{ flex: activeStep === 'contactInfo' }"
    >
      <FormKit
        id="contactInfo"
        type="group"
        name="contactInfo"
      >
        <FormKit
          :type="types.text"
          label="*Full name"
          name="full_name"
          placeholder="First Last"
          validation="required"
        />

        <FormKit
          :type="types.email"
          name="email"
          label="*Email address"
          placeholder="email@domain.com"
          validation="required|email"
        />

        <FormKit
          :type="types.tel"
          name="tel"
          label="*Telephone"
          mask="+1 (###) ###-####"
        />
      </FormKit>
    </section>

    <section
      v-show="activeStep === 'organizationInfo'"
      class="flex-col items-baseline gap-6"
      :class="{ flex: activeStep === 'organizationInfo' }"
    >
      <FormKit
        id="organizationInfo"
        type="group"
        name="organizationInfo"
      >
        <FormKit
          :type="types.text"
          label="*Organization name"
          name="org_name"
          placeholder="MyOrg, Inc."
          help="Enter your official organization name."
          validation="required|length:3"
        />

        <FormKit
          :type="types.date"
          label="Date of incorporation"
          :validation="date_rule"
          name="date_inc"
        />
      </FormKit>
    </section>

    <section
      v-show="activeStep === 'application'"
      class="flex-col items-baseline gap-6"
      :class="{ flex: activeStep === 'application' }"
    >
      <FormKit
        id="application"
        type="group"
        name="application"
      >
        <FormKit
          :type="types.checkbox"
          label="*I'm not a previous grant recipient"
          help="Have you received a grant from us before?"
          name="not_previous_recipient"
          validation="required|accepted"
          :validation-messages="{ accepted: 'We can only give one grant per organization.' }"
        />
        <FormKit
          :type="types.textarea"
          label="*How will you use the money?"
          name="how_money"
          help="Must be between 20 and 500 characters."
          placeholder="Describe how the grant will accelerate your efforts."
          validation="required|length:20,500"
        />
      </FormKit>
    </section>

    <!-- NEW: Adds Next / Previous navigation buttons. -->
    <div class="flex gap-6">
      <FormKit
        :type="types.button"
        :disabled="activeStep === 'contactInfo'"
        @click="setStep(-1)"
      >
        {{ 'Previous step' }}
      </FormKit>
      <FormKit
        :type="types.button"
        class="next"
        :disabled="activeStep === 'application' "
        @click="setStep(1)"
      >
        {{ 'Next step' }}
      </FormKit>
    </div>

    <details>
      <summary>Form data</summary>
      <pre>{{ value }}</pre>
    </details>

    <!-- NEW: Adds submit button. -->
    <FormKit :type="types.submit" :disabled="!valid">
      {{ loading ? 'Submitting...' : 'Submit Application' }}
    </FormKit>
  </FormKit>

  <p>
    <small><em>*All the contents of this form are fictional (the company, grant, and form)
      for the purposes of demonstrating the capabilities of FormKit.</em></small>
  </p>
</template>

<script setup>
import * as types from '@vuestic/formkit'
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
