<template>
  <button class="seamless-another-button">Télécharger</button>
</template>

<style lang="scss">
.seamless-another-button {
  cursor: pointer;
  position: relative;
  background-color: #16a085;
  border: none;
  color: #fff;
  transition-duration: 0.4s;
  overflow: hidden;
  border-radius: 4px;
  padding: 8px 16px !important;

  &:hover {
    background: #fff;
    box-shadow: 0px 2px 10px 5px #1abc9c;
    color: #000;
  }

  &:after {
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

  &:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
  }

  &:focus { outline:0; }
}
</style>
