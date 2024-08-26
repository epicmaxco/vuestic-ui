<script setup lang="ts">
import { useAppTree } from '../../composables/useAppTree';
import { useComponent } from '../../composables/useComponent';
import Button from './components/Button.vue';
import ButtonGroup from './components/ButtonGroup.vue';
import ButtonToggle from './components/ButtonToggle.vue';
import DateInput from './components/DateInput.vue';
import Input from './components/Input.vue';
import TimeInput from './components/TimeInput.vue';
import BasicDiv from './components/BasicDiv.vue';

const { source, code } = useComponent()
const { refresh } = useAppTree()

const emit = defineEmits(['componentAdded'])

const addComponent = async (childCode: string) => {

  await source.update(code.appendChild(childCode.trim()))
  setTimeout(() => {
    refresh()
  }, 300)
}
</script>

<template>
  <div class="va-devtools-component-select">
    <div class="va-devtools-component-select__components">
      <h2>Basic</h2>

      <div class="va-devtools-component-select__components-list">
        <BasicDiv @select="addComponent" />
      </div>

      <h2>Buttons</h2>
      <div class="va-devtools-component-select__components-list">
        <Button @select="addComponent" />
        <ButtonGroup @select="addComponent" />
        <ButtonToggle @select="addComponent" />
      </div>

      <h2>Inputs</h2>
      <div class="va-devtools-component-select__components-list">
        <Input @select="addComponent" />
        <DateInput @select="addComponent" />
        <TimeInput @select="addComponent" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .va-devtools-component-select {
    width: max-content;

    &__components {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-height: 50vh;
      overflow-y: auto;
      padding: 1rem;
    }

    &__components-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
</style>
