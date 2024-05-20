<template>
  <form ref="formRef" class="form" @submit.prevent="submitForm">
    <div v-if="formSubmitted" class="form__content">
      <h3 class="form__title">
        Thank you for reaching out!
      </h3>

      <div class="form__text mb-6">
        We have received your request and will be in touch shortly. In the meantime, feel free to explore more about our services on our website.
      </div>

      <div class="form__text">
        We look forward to assisting you with your Vue.js code audit needs!
      </div>
    </div>
    <div
      class="form__content"
      :class="{
        'invisible': formSubmitted,
      }"
    >
      <h3 class="form__title">
        Get a Free Vue.js Code Audit
      </h3>
      <p class="form__text mb-3">
        Got a Vue.js project and want to make it better? Provide us with some details about your project, and we'll get back to you within 24 hours.
      </p>
      <VaInput
        v-model="email"
        type="email"
        placeholder="Email"
        required
        name="Email"
        class="w-full mt-3"
      />
      <VaTextarea
        v-model="description"
        placeholder="Project link, tech stack, and details"
        required
        name="Field 3"
        class="w-full mt-3"
        :resize="false"
        :max-rows="4"
      />
      <Recaptcha
        ref="recaptchaRef"
        :sitekey="RECAPTCHA_SITE_KEY"
        class="mt-3"
        @verified="onRecaptchaVerified"
        @expired="onRecaptchaReset"
        @error="onRecaptchaReset"
      />
      <VaButton class="w-full mt-3" type="submit" size="large">
        Submit
      </VaButton>
      <div v-if="submitError" class="form__notice form__notice--error mt-6">
        Oops! Something went wrong while submitting the form. Please try again or contact us directly at <a href="mailto:hello@epicmax.co" target="_new">hello@epicmax.co</a>. We're here to help and ensure your inquiry is handled promptly.
      </div>
      <div v-else class="form__notice mt-6">
        Click "Submit!" to consent to processing your data by Epicmax Georgia LLC for marketing purposes, including sending emails. For details see our <a href="https://www.iubenda.com/privacy-policy/90200659" target="_blank">Privacy Policy</a>
      </div>
    </div>
  </form>
</template>

<script setup lang='ts'>
import Recaptcha from '../../Recaptcha.vue'

const FORM_NAME = 'Free Audit PopUp'
const FORM_URL  = 'https://webflow.com/api/v1/form/61eeb35ae9ff3aeddc164997'
const RECAPTCHA_SITE_KEY = useRuntimeConfig().public.RECAPTCHA_SITE_KEY

const email = ref<string>('')
const description = ref<string>('')
const recaptchaToken = ref<string>();
const recaptchaRef = ref<InstanceType<typeof Recaptcha>>();
const formRef = ref<HTMLFormElement>()

const isSubmitting = ref(false)
const formSubmitted = ref(false)
const submitError = ref(false)

function onRecaptchaVerified(token: string) {
  recaptchaToken.value = token;
}

function onRecaptchaReset() {
  recaptchaToken.value = undefined;
}

const submitForm = async () => {
  if (!recaptchaToken.value || !formRef.value) {
    return;
  }

  isSubmitting.value = true;

  const formFields = [...new FormData(formRef.value).entries()]
    .map(([field, value]) => [`fields[${encodeURIComponent(field)}]`, value.toString()])
  const formData = new URLSearchParams(formFields);
  formData.append('name', FORM_NAME)

  try {
    const response = await fetch(FORM_URL, {
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    formSubmitted.value = true
  } catch (error) {
    submitError.value = true

    throw error;
  } finally {
    recaptchaRef.value?.reset()
    isSubmitting.value = false
  }
}
</script>

<style scoped lang='scss'>
@import "@/assets";

.form {
  display: flex;

  &__content {
    flex-basis: 100%;
    flex-shrink: 0;
    max-width: 100%;
  }

  &__text {
    @include text-font();
  }

  &__title {
    margin-top: 20px;
    margin-bottom: 34px;
  }

  &__notice {
    font-size: 13px;
    color: var(--va-secondary);
  }

  &__notice--error {
    color: var(--va-danger);
  }
}

h3 {
  @include subtitle-font();

  font-size: 2.5rem !important;
}
</style>
