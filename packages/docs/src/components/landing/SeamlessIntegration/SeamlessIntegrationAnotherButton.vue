<template>
  <button class="seamless-another-button">Télécharger</button>
</template>

<style lang="scss">
.seamless-another-button {
  cursor: pointer;
  position: relative;
  background-color: #16a085 !important;
  border: none;
  color: #ffffff !important;
  transition-duration: 0.4s;
  overflow: hidden !important;
  border-radius: 4px;
  padding: 8px 16px !important;

  &:hover {
    background: #ffffff !important;
    box-shadow: 0 2px 10px 5px #1abc9c;
    color: #000000 !important;
  }

  &::after {
    content: "";
    background: #1abc9c !important;
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
