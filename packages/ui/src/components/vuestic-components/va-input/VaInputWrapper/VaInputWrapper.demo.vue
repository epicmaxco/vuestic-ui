<template>
  <VbDemo>
    <VbCard title="Default">
      <va-input-wrapper :messages="messages">
        Input
      </va-input-wrapper>
    </VbCard>

    <VbCard title="Slots scheme">
      <va-input-wrapper :messages="messages">
        <template #prepend>
          <div
            style="width: 30px; height: 30px; border: 1px dotted black;"
            class="flex-center"
          >
            <va-icon name="volume_down" />
          </div>
        </template>

        <div style="width: 200px; height: 30px; border: 1px dotted black;">
          Default Slot
        </div>
        <template #append>
          <div
            style="width: 30px; height: 30px; border: 1px dotted black;"
            class="flex-center"
          >
            <va-icon name="volume_up" />
          </div>
        </template>
      </va-input-wrapper>
    </VbCard>

    <VbCard title="Error">
      <va-input-wrapper
        :error-messages="errorMessages"
      >
        <div>Default Slot</div>
      </va-input-wrapper>
    </VbCard>

    <VbCard title="Success">
      <va-input-wrapper
        :messages="messages"
        success
      >
        <div>Default Slot</div>
      </va-input-wrapper>
    </VbCard>

    <VbCard title="Input Wrapper For Checkbox and Radio Button">
      <va-input-wrapper :messages="messages">
        <va-checkbox
          name="agree-to-terms"
          v-model="agreedToTerms"
        >
          <template #label>
            I agree to
            <a
              class="link"
              href="javascript:void(0);"
            >Terms of use.</a>
          </template>
        </va-checkbox>
      </va-input-wrapper>

      <va-input-wrapper :messages="messages">
        <va-radio
          option="option1"
          v-model="radioSelectedOption"
          label="Radio"
        />
      </va-input-wrapper>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaInputWrapper from './index'
import VaIcon from '../../va-icon'
import VaCheckbox from '../../va-checkbox'
import VaRadio from '../../va-radio'

export default {
  components: {
    VaCheckbox,
    VaInputWrapper,
    VaIcon,
    VaRadio,
  },
  data () {
    return {
      empty: '',
      agreedToTerms: false,
      radioSelectedOption: false,
      text: 'Vuestic',
      messages: ['Required field'],
      errorMessages: ['Detailed error message', 'Detailed error message', 'Detailed error message'],
    }
  },
}
</script>
