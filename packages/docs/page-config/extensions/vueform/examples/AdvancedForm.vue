<template>
  <ClientOnly>
    <Vueform :display-errors="false" @submit="onSubmit">
      <VaInputElement
        name="full_name"
        label="Full Name"
        placeholder="Enter your name"
        rules="required|min:3"
      />

      <VaSelectElement
        name="country"
        label="Country"
        :options="['USA', 'Canada', 'Germany']"
        placeholder="Select a country"
        rules="required|in:Canada,Germany"
        :messages="{ in: 'Service is not available in this country' }"
      />

      <VaRadioElement
        name="gender"
        label="Gender"
        :options="['Male', 'Female', 'Other']"
        rules="required"
      />

      <VaCheckboxElement
        name="subscribe"
        label="Subscribe to newsletter"
      />

      <VaTextareaElement
        name="about"
        label="About you"
        placeholder="Write a short bio..."
        rules="min:10|max:300"
      />

      <VaDateInputElement
        name="birthdate"
        label="Birthdate"
        rules="required|before:2015-01-01"
      />

      <VaTimeInputElement
        name="appointment_time"
        label="Preferred Appointment Time"
        rules="required"
      />

      <VaSliderElement
        name="satisfaction"
        label="Satisfaction level"
        track-label-visible
        rules="integer|required|min:50|max:100"
      />

      <VaCounterElement
        name="quantity"
        label="Quantity"
        rules="required|integer|min:3"
      />

      <VaRatingElement
        name="rating"
        label="Rate our service"
        :texts="['Bad', 'Quite bad', 'Normal', 'Not bad', 'Good']"
        rules="required"
      />
      <VaInputElement
        name="comment"
        :conditions="[
          ['rating', '<', 3],
          ['rating', '!=', null]
        ]"
        label="Explain what went wrong"
        rules="required"
      />

      <VaFileUploadElement
        name="avatar"
        upload-button-text="Upload your avatar"
        upload-type="single"
        rules="required"
      />

      <VaSwitchElement
        name="advanced"
        label="Show advanced options?"
      />

      <VaInputElement
        name="github"
        label="GitHub Username"
        placeholder="username"
        rules="required|url"
        :conditions="[
          ['advanced', '==', true],
        ]"
      />

      <VaTextareaElement
        name="notes"
        label="Internal Notes"
        placeholder="For internal use"
        :conditions="[
          ['advanced', '==', true],
        ]"
      />

      <VaButtonElement
        name="submit"
        submits
      >
        Submit
      </VaButtonElement>
    </Vueform>
  </ClientOnly>
</template>


<script setup>
import { VaInputElement, VaDateInputElement, VaCheckboxElement, VaRadioElement, VaButtonElement, VaSelectElement, VaTextareaElement, VaSliderElement, VaFileUploadElement, VaCounterElement, VaRatingElement, VaSwitchElement,VaTimeInputElement } from '@vuestic/vueform'

function onSubmit () {
  alert('Form submitted!')
}
</script>
