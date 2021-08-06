<template>
  <button class="seamless-another-button">Télécharger</button>
</template>

<style>
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
}

.seamless-another-button:hover {
  background: #fff;
  box-shadow: 0px 2px 10px 5px #1abc9c;
  color: #000;
}

.seamless-another-button:after {
  content: "";
  background: #1abc9c;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.seamless-another-button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

.seamless-another-button:focus { outline:0; }
</style>
