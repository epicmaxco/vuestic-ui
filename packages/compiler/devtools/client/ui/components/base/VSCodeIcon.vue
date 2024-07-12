<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
    <mask id="a" width="100" height="100" x="0" y="0" mask-type="alpha" maskUnits="userSpaceOnUse">
      <path fill="#fff" fill-rule="evenodd"
        d="M71 99.3c1.5.6 3.3.6 4.9-.2l20.6-9.9c2.1-1 3.5-3.2 3.5-5.6V16.4c0-2.4-1.4-4.6-3.5-5.6L75.9.8a6.2 6.2 0 0 0-7.1 1.3L29.4 38 12.2 25a4.2 4.2 0 0 0-5.3.1l-5.5 5a4.2 4.2 0 0 0 0 6.2L16.2 50 1.4 63.6a4.2 4.2 0 0 0 0 6.1l5.5 5a4.2 4.2 0 0 0 5.3.3l17.2-13 39.4 36c.6.5 1.3 1 2.1 1.3Zm4-72L45.1 50l30 22.7V27.3Z"
        clip-rule="evenodd" />
    </mask>
    <g mask="url(#a)">
      <path fill="#0065A9"
        d="M96.5 10.8 75.9.8a6.2 6.2 0 0 0-7.2 1.3L1.3 63.6a4.2 4.2 0 0 0 0 6.1l5.5 5a4.2 4.2 0 0 0 5.3.3l81.3-61.6c2.7-2.1 6.6-.2 6.6 3.3v-.3c0-2.4-1.4-4.6-3.5-5.6Z" />
      <g filter="url(#b)">
        <path fill="#007ACC"
          d="m96.5 89.2-20.6 10a6.2 6.2 0 0 1-7.2-1.3L1.3 36.4a4.2 4.2 0 0 1 0-6.1l5.5-5a4.2 4.2 0 0 1 5.3-.3l81.3 61.6c2.7 2.1 6.6.2 6.6-3.3v.3c0 2.4-1.4 4.6-3.5 5.6Z" />
      </g>
      <g filter="url(#c)">
        <path fill="#1F9CF0"
          d="M75.9 99.1a6.2 6.2 0 0 1-7.2-1.2c2.4 2.3 6.3.7 6.3-2.6V4.7c0-3.3-4-5-6.3-2.6A6.2 6.2 0 0 1 76 .9l20.6 9.9c2.1 1 3.5 3.2 3.5 5.6v67.2c0 2.4-1.4 4.6-3.5 5.6l-20.6 10Z" />
      </g>
      <path fill="url(#d)" fill-rule="evenodd"
        d="M70.9 99.3c1.5.6 3.3.6 5-.2l20.5-9.9c2.2-1 3.5-3.2 3.5-5.6V16.4c0-2.4-1.3-4.6-3.5-5.6L75.8.8a6.2 6.2 0 0 0-7 1.3L29.2 38 12 25a4.2 4.2 0 0 0-5.3.1l-5.5 5a4.2 4.2 0 0 0 0 6.2L16.2 50 1.3 63.6a4.2 4.2 0 0 0 0 6.1l5.5 5a4.2 4.2 0 0 0 5.3.3l17.2-13 39.4 36c.6.5 1.4 1 2.2 1.3Zm4-72L45 50l30 22.7V27.3Z"
        clip-rule="evenodd" opacity=".3" style="mix-blend-mode:overlay" />
    </g>
    <defs>
      <filter id="b" width="116.7" height="92.2" x="-8.4" y="15.8" color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="4.2" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <filter id="c" width="47.9" height="116.2" x="60.4" y="-8.1" color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="4.2" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <linearGradient id="d" x1="49.9" x2="49.9" y1=".3" y2="99.7" gradientUnits="userSpaceOnUse">
        <stop stop-color="#fff" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>