<template>
  <VaCard
    class="user-card"
    color="#25272c"
    gradient
  >
    <VaCardContent class="flex">
      <div>
        <VaAvatar
          src="https://randomuser.me/api/portraits/men/3.jpg"
          size="128px"
        />
      </div>

      <div class="pl-2 flex flex-col justify-end">
        <span class="title">Profile</span>
        <div class="text-2xl font-bold">
          User
        </div>

        <div class="flex flex-wrap">
          <span class="mr-2 va-text-no-wrap">29 public playlists</span>
          <span class="mr-2 va-text-no-wrap">10 followers</span>
          <span class="mr-2 va-text-no-wrap">16 following</span>
        </div>

        <VaCardActions class="flex pt-2">
          <VaButton
            preset="secondary"
            color="#fff"
            class="-ml-[0.5rem]"
          >
            Follow
          </VaButton>
          <VaSpacer />
          <VaButton
            preset="secondary"
            color="#fff"
            icon="message"
          />
          <VaButton
            preset="secondary"
            color="#fff"
            icon="play_arrow"
          />
        </VaCardActions>
      </div>
    </VaCardContent>
  </VaCard>
</template>

<style lang="scss">
.user-card {
  --va-card-display: inline-block;
  --va-button-content-px: 0.5rem;
  --va-avatar-border-radius: 60% 40% 58% 42% / 39% 48% 52% 61%;

  .va-card__actions {
    --va-card-padding: 0;
  }

  &:hover {
    --va-avatar-border-radius: 28% 72% 24% 76% / 71% 17% 83% 29%;
  }
}
</style>
