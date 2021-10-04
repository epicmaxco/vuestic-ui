<template>
  <div class="seamless-another-range-slider">
    <input type="range" min="0" max="40" value="20" />
  </div>
</template>

<style lang="scss">
.seamless-another-range-slider {
  height: 2rem;
  border-radius: 5rem;

  input[type="range"] {
    -webkit-appearance: none;
    width: 80%;
    height: 100%;
    background: transparent;

    &:focus {
      outline: none;
    }

    //WEBKIT
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #ffffff;
      margin-top: -5px;
      box-shadow: 1px 1px 2px rgba(#000000, 0.5);
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      width: 60%;
      height: 9px;
      background: #bdbdbd;
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }

    &:hover::-webkit-slider-runnable-track {
      background: #ff6e40;
    }

    // IE

    &::-ms-track {
      width: 60%;
      cursor: pointer;
      height: 9px;
      transition: all 0.5s;

      /* Hides the slider so custom styles can be added */
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    &::-ms-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #ffffff;
      margin-top: -5px;
      box-shadow: 1px 1px 2px rgba(#000000, 0.5);
      cursor: pointer;
    }

    &::-ms-fill-lower {
      background: #bdbdbd;
      border-radius: 3rem;
    }

    &:focus::-ms-fill-lower {
      background: #ff6e40;
    }

    &::-ms-fill-upper {
      background: #bdbdbd;
      border-radius: 3rem;
    }

    &:focus::-ms-fill-upper {
      background: #ff6e40;
    }

    //FIREFOX
    &::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #ffffff;
      margin-top: -5px;
      box-shadow: 1px 1px 2px rgba(#000000, 0.5);
      cursor: pointer;
    }

    &::-moz-range-track {
      width: 60%;
      height: 9px;
      background: #bdbdbd;
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }

    &:hover::-moz-range-track {
      background: #ff6e40;
    }
  }
}
</style>
