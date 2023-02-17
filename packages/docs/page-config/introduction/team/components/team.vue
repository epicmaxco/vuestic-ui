<template>
  <div class="docs-team flex flex-wrap">
    <div class="docs-team__row flex flex-wrap">
      <div
        v-for="item in items"
        :key="item.image"
        class="docs-team__avatar-wrapper"
      >
        <va-avatar
          :size="146"
          class="docs-team__avatar"
        >
          <img
            :src="item.image"
            :alt="item.name"
            height="140px"
            width="140px"
          >
        </va-avatar>
        <strong class="mt-3 mb-1">{{ item.name }}</strong>
        <div>{{ item.jobTitle }}</div>
        <div
          v-if="item.socNetworks"
          class="flex"
        >
          <div
            v-for="icon in item.socNetworks"
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
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { TeamItem } from "../types";

const props = defineProps({
  team: {
    type: Array as PropType<TeamItem[]>,
    default: () => [],
  },
});

const items = computed(() => {
  return props.team.map((item, index) => {
    return {
      ...item,
      name: typeof item === "string" ? item : item.name,
      jobTitle: typeof item === "string" ? item : item.jobTitle,
      image: item.image,
    };
  });
});

useHead({
  link: [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
  ]
})
</script>

<style lang="scss">
$gap: 1rem;

.docs-team {
  margin: 0 -$gap;

  &__avatar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
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
