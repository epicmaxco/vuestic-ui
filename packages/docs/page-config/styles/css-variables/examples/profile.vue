<template>
  <va-card
    class="user-card"
    color="#25272c"
    gradient
  >
    <va-card-content class="flex">
      <div>
        <va-avatar
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

        <va-card-actions class="flex pt-2">
          <va-button
            preset="secondary"
            color="#fff"
            class="-ml-[0.5rem]"
          >
            Follow
          </va-button>
          <va-spacer />
          <va-button
            preset="secondary"
            color="#fff"
            icon="message"
          />
          <va-button
            preset="secondary"
            color="#fff"
            icon="play_arrow"
          />
        </va-card-actions>
      </div>
    </va-card-content>
  </va-card>
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
