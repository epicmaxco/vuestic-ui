<template>
  <button class="seamless-another-button">
    Télécharger
  </button>
</template>

<style lang="scss" scoped>
$button-color: #117763;

.seamless-another-button {
  cursor: pointer;
  position: relative;
  background-color: $button-color;
  border: none;
  color: #ffffff;
  transition-duration: 0.4s;
  overflow: hidden !important;
  border-radius: 4px;
  padding: 8px 16px !important;

  &:hover {
    background: #ffffff;
    box-shadow: 0 2px 10px 5px $button-color;
    color: #000000;
  }

  &::after {
    content: "";
    background: #1abc9c;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -40px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s;
    border-radius: 50%;
  }

  &:active::after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }

  &:focus { outline: 0; }
}
</style>
