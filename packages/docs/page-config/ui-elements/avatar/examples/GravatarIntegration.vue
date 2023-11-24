<template>
  <VaAvatarGroup
    :options="avatars"
    :max="3"
    :loading="isLoading"
  />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

const EMAIL_LIST = [
  'hello@epicmax.co',
  'foo@bar.com',
  'fizz@buzz.net',
  'user@domain.com',
  'example@domain.com',
]

const AVATAR_OPTIONS = ['mp', 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash']

const getRandomAvatarOption = () => AVATAR_OPTIONS[Math.floor(Math.random() * AVATAR_OPTIONS.length)]

// See Gravatar image request parameters here: https://en.gravatar.com/site/implement/images/
const getGravatarUrl = (hash) => `https://gravatar.com/avatar/${hash}?s=200&d=${getRandomAvatarOption()}&r=g`

// Generate MD5 hash online here, but you can do it locally with any library you want to use
const requestHash = (email) => fetch(`https://api.hashify.net/hash/md5/hex?=value${email}`).then(res => res.json())

const isLoading = ref(true)
const avatars = ref([])

onBeforeMount(async () => {
  const promised = await Promise.all(EMAIL_LIST.map(requestHash))

  avatars.value = promised.map(({ Digest }) => ({
    src: getGravatarUrl(Digest),
  }))
  isLoading.value = false
})
</script>
