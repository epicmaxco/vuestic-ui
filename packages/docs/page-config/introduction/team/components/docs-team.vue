<template>
      <div class="docs-team grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 -mb-4 mt-8">
      <div
        v-for="item in team"
        :key="item.image"
        class="docs-team__avatar-wrapper mb-8"
      >
        <va-avatar
          :size="146"
          class="docs-team__avatar"
        >
          <img
            :src="item.image"
            :alt="item.name"
            height="140"
            width="140"
          >
        </va-avatar>
        <strong class="mt-3 mb-1">{{ item.name }}</strong>
        <div>{{ item.jobTitle }}</div>
        <div
          v-if="item.socialNetworks"
          class="flex"
        >
          <div
            v-for="icon in item.socialNetworks"
            :key="icon.url"
          >
            <a
              :href="icon.url"
              :title="item.name"
              target="_blank"
            >
              <va-icon
                :class="icon.name"
                class="mr-1"
                size="small"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { TeamItem } from "../types";

const props = defineProps({
  team: {
    type: Array as PropType<TeamItem[]>,
    required: true,
  },
});

useHead({
  link: [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
  ]
})
</script>

<style lang="scss">
.docs-team {
  &__avatar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__avatar {
    padding: 3px;
    background:
      linear-gradient(
        108.62deg,
        #e9439d,
        #e5419e,
        #9e23b2 100%,
        #ffffff
      )
      border-box;
    -webkit-mask:
      linear-gradient(
        108.62deg,
        #e9439d,
        #e5419e,
        #9e23b2 100%,
        #ffffff
      )
      padding-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    overflow: hidden;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      border: 4px solid white;
    }
  }

  .fa-github {
    color: var(--va-on-background-primary);
  }

  .fa-facebook {
    color: #3b5998;
  }

  .fa-twitter {
    color: rgba(29, 161, 242, 1);
  }
}
</style>
