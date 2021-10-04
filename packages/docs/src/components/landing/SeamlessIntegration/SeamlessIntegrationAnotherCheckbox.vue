<template>
  <div>
    <input
      class="inp-seamless-another-checkbox"
      id="seamless-another-checkbox"
      type="checkbox"
      style="display: none;"
    />
    <label class="seamless-another-checkbox" for="seamless-another-checkbox">
      <span>
        <svg width="12px" height="10px" viewbox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </span>
      <span>Agree to terms</span>
    </label>
  </div>
</template>

<style lang="scss">
.seamless-another-checkbox {
  margin: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;

  span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);

    &:first-child {
      position: relative;
      width: 18px;
      height: 18px;
      border-radius: 3px;
      transform: scale(1);
      vertical-align: middle;
      border: 1px solid #9098a9;
      transition: all 0.2s ease;

      svg {
        position: absolute;
        top: 3px;
        left: 2px;
        fill: none;
        stroke: #ffffff;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
      }

      &::before {
        content: "";
        width: 100%;
        height: 100%;
        background: #506eec;
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
      }
    }

    &:last-child {
      padding-left: 8px;
    }
  }

  &:hover span:first-child {
    border-color: #506eec;
  }
}

.inp-seamless-another-checkbox:checked + .seamless-another-checkbox {
  span {
    &:first-child {
      background: #506eec;
      border-color: #506eec;
      animation: wave 0.4s ease;

      svg {
        stroke-dashoffset: 0;
      }

      &::before {
        transform: scale(3.5);
        opacity: 0;
        transition: all 0.6s ease;
      }
    }
  }
}
</style>
