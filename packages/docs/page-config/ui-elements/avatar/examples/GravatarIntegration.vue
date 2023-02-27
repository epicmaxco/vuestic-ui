<template>
  <va-avatar-group
    :options="avatars"
    :max="3"
  />
</template>

<script setup>
const avatars = [
  { src: "https://gravatar.com/avatar/3838b0add3e16681872d58bc58707a82?s=400&d=retro&r=x" },
  { src: "https://gravatar.com/avatar/358a8bdc1b84cb5c7328a3c35f63ed92?s=400&d=retro&r=x" },
  { src: "https://gravatar.com/avatar/f2a8e4f4b863fb1f491cccccd43efc91?s=400&d=retro&r=x" },
  { src: "https://gravatar.com/avatar/0a482032d3d01e3088270716ade64294?s=400&d=retro&r=x" },
  { src: "https://gravatar.com/avatar/8288afc6dd30634665a7429c246104fc?s=400&d=retro&r=x" },
]
</script>
