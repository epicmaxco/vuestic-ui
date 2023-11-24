<template>
  <div class="cards">
    <VaCard class="card card-1">
      <VaCardTitle>
        <h3 class="va-h3 m-0">
          Get started
        </h3>
      </VaCardTitle>

      <VaCardContent>
        <VaInput
          stateful
          label="Email"
          class="mb-2"
        />
        <VaInput
          label="City"
          class="mb-2"
          :rules="[(v) => v.length > 3]"
          :model-value="'Kyiv'"
          success
        />
        <VaSelect
          stateful
          label="Country"
          class="mb-2"
          :options="['Ukraine', 'Georgia', 'Poland']"
          :error-messages="['Country is required']"
          error
        />
      </VaCardContent>

      <VaCardActions align="between">
        <VaButton
          preset="secondary"
          color="secondary"
        >
          Go back
        </VaButton>
        <VaButton>Login</VaButton>
      </VaCardActions>
    </VaCard>

    <VaCard class="card card-2">
      <VaCardContent>
        <table class="w-full">
          <tr>
            <td>Amount</td>
            <td>
              <VaSlider
                :model-value="40"
                stateful
              />
            </td>
          </tr>
          <tr>
            <td>Package</td>
            <td><VaSwitch stateful /></td>
          </tr>
          <tr>
            <td>Review</td>
            <td>
              <VaRating
                stateful
                :model-value="4.5"
                halves
              />
            </td>
          </tr>
        </table>
        <VaAlert class="my-4" color="warning" icon="info">
          You can't change your review after sending
        </VaAlert>
        <VaCheckbox
          stateful
          label="I agree with all terms!!!"
        />
      </VaCardContent>
      <VaDivider />
      <VaCardActions align="between">
        <div />
        <VaButton>Send review</VaButton>
      </VaCardActions>
    </VaCard>

    <div class="card card-3">
      <VaDatePicker />
    </div>

    <div class="card card-4">
      <VaSidebar>
        <VaSidebarItem
          v-for="item in ['Home', 'Cabinet', 'Gallery', 'Shop', 'Logout']"
          :key="item"
          :active="item === 'Shop'"
        >
          <VaSidebarItemContent>{{ item }}</VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </div>

    <div class="card card-6">
      <VaAlert color="info">
        Read this information
      </VaAlert>
    </div>

    <div class="card card-7">
      <VaTabs
        stateful
        :model-value="0"
        grow
      >
        <template #tabs>
          <VaTab
            v-for="tab in ['One', 'Two', 'Three']"
            :key="tab"
          >
            {{ tab }}
          </VaTab>
        </template>
      </VaTabs>
    </div>

    <div class="card card-8">
      <VaCard
        color="primary"
        gradient
      >
        <VaCardContent>
          <h2 class="m-0">
            12:00 pm
          </h2>
        </VaCardContent>
      </VaCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cards {
  position: relative;
  height: 500px;
  overflow: hidden;
  margin: 16px 0;
  background: var(--va-background-primary);
}

.card {
  position: absolute;
  width: 33%;

  &-1 {
    right: 16px;
    z-index: 3;
    top: 50%;
    min-width: 300px;
    transform: translateY(-50%);
  }

  &-2 {
    left: 20%;
    z-index: 4;
    max-width: 400px;
    top: 16px;
    min-width: 300px;
  }

  &-3 {
    top: 70%;
    left: 50%;
    z-index: 1;
    transform: translateY(-50%);
  }

  &-4 {
    height: 100%;
    z-index: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &-5 {
    top: 10%;
    right: 10%;
  }

  &-6 {
    bottom: 5%;
    right: 10%;
    z-index: 2;
    min-width: 250px;
  }

  &-7 {
    right: 0;
    top: 36px;
    z-index: 0;
  }

  &-8 {
    left: 16px;
    bottom: 16px;
  }
}
</style>
