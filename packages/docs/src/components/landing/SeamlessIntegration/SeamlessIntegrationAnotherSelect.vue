<template>
  <div>
    <div class="seamless-another-select">
      <select>
        <option
          v-for="option of options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <span class="focus"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SeamlessAnotherSelect',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss">
.seamless-another-select {
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;

  select {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    z-index: 1;

    &[multiple] {
      padding-right: 0;
      height: 6rem;

      option {
        white-space: normal;
        outline-color: blue;
      }
    }

    &::-ms-expand {
      display: none;
    }

    outline: none;

    &:focus + .focus {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border: 2px solid blue;
      border-radius: inherit;
    }
  }

  select,
  &::after {
    grid-area: select;
  }

  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid #777777;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #ffffff;
  background-image: linear-gradient(to top, #f9f9f9, #ffffff 33%);

  &:not(.seamless-another-select--multiple)::after {
    content: "";
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: #777777;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
}
</style>
