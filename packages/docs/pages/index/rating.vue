<template>
  <div>
    <va-content>
      <h1>Rating</h1>
      <p
        class="margin-bottom"
      >Rating component can show rating bla bla bla bla lorem ipsum many text Rating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many text</p>
      <h3>Basic element</h3>
      <p>This is basic rating component implementation</p>
    </va-content>
    <va-rating v-model="value" />
    <va-content>
      <pre class="code">
        {{basicElementCode}}
      </pre>
      <p
        class="margin-bottom"
      >Rating component can show rating bla bla bla bla lorem ipsum many text Rating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many textRating component can show rating bla bla bla bla lorem ipsum many text</p>

      <h3>
        Advanced Element
        <a id="advanced-element" href="#advanced-element" :style="{color: computedColor}">#</a>
      </h3>
    </va-content>
    <rating-color-docs-demo />
    <va-content>
      <h3>
        API
        <a id="api" href="#api" :style="{color: computedColor}">#</a>
      </h3>
      <p>Here are props that are used in va-rating component more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text more loren ipsum color text</p>
      <table class="api__table margin-bottom">
        <thead>
          <tr>
            <th v-for="(data, index) in tableDataHead" :key="index">{{ data }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in tableData" :key="index">
            <td v-for="(i, tdIndex) in data" :key="tdIndex" :class="getClass(tdIndex)">{{ i }}</td>
          </tr>
        </tbody>
      </table>
      <h3>
        FAQ
        <a href="#faq" id="faq" :style="{color: computedColor}">#</a>
      </h3>
      <h5>Frequently asked question one</h5>
      <p>Answer one and more text and more text and more text and more text and more text and more text and more text and more text and more text and more text and more text and more text and more text</p>
    </va-content>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VaContent from "../../../ui/src/components/vuestic-components/va-content/VaContent.vue";
import VaRating from "../../../ui/src/components/vuestic-components/va-rating/VaRating.vue";
import RatingColorDocsDemo from "../../components/rating-docs-demo/RatingColorDocsDemo.vue";

export default Vue.extend({
  components: {
    VaContent,
    VaRating,
    RatingColorDocsDemo
  },
  data() {
    return {
      basicElementCode: `
<va-rating
  v-model="value"
/>`,
      value: 3,
      tableDataHead: ["property", "description", "type", "default", "version"],
      tableData: [
        [
          "icon",
          "icon for full selected rating item",
          "String",
          "fa fa-star",
          "1.0"
        ],
        [
          "halfIcon",
          "icon for half selected rating item",
          "String",
          "fa fa-star-half-full",
          "1.0"
        ],
        [
          "emptyIcon",
          "icon for not selected rating item",
          "String",
          "-",
          "1.0"
        ],
        ["value", "value between 0 and max", "Number", "1", "1.0"],
        ["readonly", "makes `va-rating` read only", "Boolean", "false", "1.0"],
        ["disabled", "makes `va-rating` disabled", "Boolean", "false", "1.0"],
        [
          "numbers",
          "makes `va-rating` use numbers instead of icons",
          "Boolean",
          "false",
          "1.0"
        ],
        ["max", "maximum value", "Number", "5", "1.0"],
        [
          "size",
          "use this property to set items size in rating. You can use preset values (`medium`, `large`, `small`) or define exact size: `30px`.",
          "String",
          "medium",
          "1.0"
        ],
        ["color", "theme or color of va-rating marks", "String", "black", "1.0"]
      ]
    };
  },
  computed: {
    computedColor() {
      return this.$themes?.primary
    }
  },
  methods: {
    getClass(index: number) {
      return [
        "api__table__property",
        "api__table__description",
        "api__table__type"
      ][index];
    }
  }
});
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
  color: '#2C82E0' !important,
}
</style>