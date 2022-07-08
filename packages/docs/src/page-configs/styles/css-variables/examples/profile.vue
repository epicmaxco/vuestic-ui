<template>
  <va-card class="user-card" color="#25272c" gradient>
    <va-card-content class="d-flex">
      <div>
        <va-avatar src="https://randomuser.me/api/portraits/men/3.jpg" size="128px" />
      </div>

      <div class="pl-2 d-flex flex-direction--column justify--end">
        <span class="title">Profile</span>
        <h5 class="display-5 ma-0" style="color: inherit;">User</h5>

        <div class="d-flex flex-wrap">
          <span class="mr-2 text--no-wrap">29 public playlists</span>
          <span class="mr-2 text--no-wrap">10 followers</span>
          <span class="mr-2 text--no-wrap">16 following</span>
        </div>

        <va-card-action class="d-flex pt-2">
          <va-button flat color="white" style="margin-left: -0.5rem;">Follow</va-button>
          <va-spacer />
          <va-button flat color="white" icon="message"></va-button>
          <va-button flat color="white" icon="play_arrow"></va-button>
        </va-card-action>
      </div>
    </va-card-content>
  </va-card>
</template>

<style lang="scss">
.user-card {
  --va-card-display: inline-block;
  --va-button-content-px: 0.5rem;
  --va-avatar-border-radius: 60% 40% 58% 42% / 39% 48% 52% 61%;

  &:hover {
    --va-avatar-border-radius: 28% 72% 24% 76% / 71% 17% 83% 29%;
  }
}
</style>
