<template>
  <VbDemo>
    <VbCard title="Value" style="width: 50px;">
      {{ value }}
    </VbCard>
    <VbCard title="Default">
      <va-rating v-model="value" />
    </VbCard>
    <VbCard title="With texts" style="width: 300px;">
      <va-rating
        v-model="value"
        text-color="danger"
        hover
        halves
        :texts="[
          'Bad',
          'Quite bad',
          'Normal',
          'Not bad',
          'Good'
        ]"
      />
    </VbCard>
    <VbCard title="Custom length">
      <va-rating :max="3" v-model="value" />
    </VbCard>
    <VbCard title="With halves">
      <va-rating halves v-model="value" />
    </VbCard>
    <VbCard title="With hover">
      <va-rating hover v-model="value" />
    </VbCard>
    <VbCard title="With halves and hover">
      <va-rating hover halves v-model="value" />
    </VbCard>
    <VbCard title="Clearable">
      <va-rating clearable v-model="value" />
    </VbCard>
    <VbCard title="Colors" dark>
      <va-rating color="success" v-model="value" />
      <va-rating color="info" v-model="value" />
      <va-rating color="warning" v-model="value" />
      <va-rating color="danger" v-model="value" />
      <va-rating color="dark" v-model="value" />
      <va-rating color="grey" v-model="value" />
    </VbCard>
    <VbCard title="Custom color for unselected">
      <va-rating
        hover
        unselected-color="danger"
        v-model="value"
      />
    </VbCard>
    <VbCard title="Sizes">
      <va-rating size='small' v-model="value" />
      <va-rating size='medium' v-model="value" />
      <va-rating size='large' v-model="value" />
      <va-rating :size="40" v-model="value" />
      <va-rating :size="60" v-model="value" />
    </VbCard>
    <VbCard title="Disabled">
      <va-rating disabled hover v-model="value" />
    </VbCard>
    <VbCard title="Readonly">
      <va-rating readonly hover v-model="value" />
    </VbCard>
    <VbCard title="With custom icons">
      <va-rating
        icon="heart"
        empty-icon="heart_empty"
        v-model="value"
      />
      <va-rating
        icon="ion-home"
        empty-icon="ion-home_empty"
        v-model="value"
      />
      <va-rating
        icon="thumb_up"
        empty-icon="thumb_up_empty"
        v-model="value"
      />
      <va-rating
        icon="battery"
        half-icon="battery_half"
        halves
        hover
        empty-icon="battery_empty"
        v-model="value"
      />
    </VbCard>
    <VbCard title="With custom icons + size and color">
      <va-rating
        size="2rem"
        color="danger"
        hover
        icon="heart"
        empty-icon="heart_empty"
        v-model="value"
      />
      <va-rating
        size="large"
        color="info"
        icon="ion-home"
        empty-icon="ion-home_empty"
        v-model="value"
      />
      <va-rating
        :size="20"
        icon="thumb_up"
        empty-icon="thumb_up_empty"
        v-model="value"
      />
      <va-rating
        color="success"
        size='3rem'
        icon="battery"
        half-icon="battery_half"
        halves
        hover
        empty-icon="battery_empty"
        v-model="value"
      />
    </VbCard>
    <VbCard title="Numbers">
      <va-rating numbers v-model="value" />
    </VbCard>
    <VbCard title="Custom length">
      <va-rating numbers :max="3" v-model="value" />
    </VbCard>
    <VbCard title="With halves">
      <va-rating numbers halves v-model="value" />
    </VbCard>
    <VbCard title="With hover">
      <va-rating numbers hover v-model="value" />
    </VbCard>
    <VbCard title="With halves and hover">
      <va-rating numbers hover halves v-model="value" />
    </VbCard>
    <VbCard title="Clearable">
      <va-rating numbers clearable v-model="value" />
    </VbCard>
    <VbCard title="Colors" dark>
      <va-rating numbers color="success" v-model="value" />
      <va-rating numbers color="info" v-model="value" />
      <va-rating numbers color="warning" v-model="value" />
      <va-rating numbers color="danger" v-model="value" />
      <va-rating numbers color="dark" v-model="value" />
      <va-rating numbers color="#ffff00" v-model="value" />
    </VbCard>
    <VbCard title="Custom color for unselected">
      <va-rating
        hover
        numbers
        unselected-color="danger"
        v-model="value"
      />
    </VbCard>
    <VbCard title="Sizes">
      <va-rating numbers size='small' v-model="value" />
      <va-rating numbers size='medium' v-model="value" />
      <va-rating numbers size='large' v-model="value" />
      <va-rating numbers :size="40" v-model="value" />
      <va-rating numbers :size="60" v-model="value" />
    </VbCard>
    <VbCard title="Disabled">
      <va-rating numbers disabled hover v-model="value" />
    </VbCard>
    <VbCard title="Readonly">
      <va-rating numbers readonly hover v-model="value" />
    </VbCard>
    <VbCard
      title="Uses context and is stateful"
    >
      <va-context :config="{
        VaRating: {
          color: 'danger',
          max: 10,
          hover: true,
          halves: true
        }
      }">
        <va-rating stateful />
      </va-context>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaRating from './index'
import VaContext from '../va-config'

export default {
  components: {
    VaRating,
    VaContext,
  },
  data () {
    return {
      value: 1,
    }
  },
}
</script>
