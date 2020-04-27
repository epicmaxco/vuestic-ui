<template>
  <docs-content :config="config"></docs-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent'
import ratingConfig from '../../components/docs-content/configs/rating'

@Component({
  components: {
    DocsContent,
  },
})
export default class Rating extends Vue {
  get config () {
    return ratingConfig
  }
}
</script>

<style lang="scss" scoped>
h1,
h3 {
  margin: 0.5em 0 0.5em 0;
}

.margin-bottom {
  margin-bottom: 2.5em;
}

.api__table {
  th {
    text-align: left;
  }

  width: 100%;

  &__property {
    font-weight: bold;
  }

  &__type {
    color: red;
  }

  &__description {
    width: 50%;
  }
}

.content-link {
  color: '#2C82E0' !important,;
}
</style>
