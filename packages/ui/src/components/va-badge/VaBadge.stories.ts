import { VaBadge } from './'
import { VaIcon } from '../va-icon'
import { VaButton } from '../va-button'
import { placementsPositionsWithAliases } from '../../composables'
import { VaCard, VaCardContent } from '../va-card'
import { VaAvatar } from '../va-avatar'
import { ref } from 'vue'

type StoryStatus = 'stale'
const statusToText = (status?: StoryStatus) => {
  if (status === 'stale') {
    return `**<span style="color: #af0f0f">[${status}]</span>**`
  }
  return ''
}

const addText = (story: any, text?: string, status?: StoryStatus) => {
  story.parameters = story.parameters || {}
  story.parameters.docs = story.parameters.docs || {}
  story.parameters.docs.description = story.parameters.docs.description || {}
  story.parameters.docs.description.story = `${statusToText(status)} ${text || ''}`
}

export default {
  components: { VaAvatar, VaCardContent, VaCard },
  title: 'VaBadge',
  component: VaBadge,
  tags: ['autodocs'],
}

export const Standalone = {
  args: {
    text: 'Paid',
  },
}

export const TextColor = {
  args: {
    text: 'Paid',
    textColor: 'textPrimary',
  },
}

export const Floating = () => ({
  components: { VaBadge },
  template: `
    <va-badge text="I am Label">
    <template #text>
      I am Badge
    </template>
    label + slotted badge
    </va-badge>
  `,
})
addText(
  Floating,
  'That\'s about floating behavior, but syntax is extremely weird.',
  'stale',
)

export const MultiLine = () => ({
  components: { VaBadge },
  template: `
    <p>false</p>
    <va-badge
      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    />
    <p>true</p>
    <va-badge
      multi-line
      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    />
  `,
})

export const Placement = () => ({
  components: { VaBadge },
  setup () {
    return {
      placementsPositionsWithAliases,
    }
  },
  template: `
    <div style="padding: 0 5rem; display: flex; flex-direction: column; gap: 2.5rem;">
      <va-badge
        v-for="placement in placementsPositionsWithAliases"
        :key="placement"
        :text="placement"
        :placement="placement"
      >
        [anchor]
      </va-badge>
    </div>
  `,
})
addText(
  Placement,
  'This demo is too noisy and lacks structure.',
  'stale',
)

export const Overlap = () => ({
  components: { VaBadge },
  setup () {
    return {
      placementsPositionsWithAliases,
    }
  },
  template: `
    <div style="padding: 0 5rem; display: flex; flex-direction: column; gap: 2.5rem;">
      <va-badge
        v-for="placement in placementsPositionsWithAliases"
        :key="placement"
        :text="placement"
        :placement="placement"
        overlap
      >
        [anchor]
      </va-badge>
    </div>
  `,
})
addText(
  Overlap,
  'We don\'t have to go through all badge positions for this demo to work.',
  'stale',
)

export const OverlapAndDot = () => ({
  components: { VaBadge },
  setup () {
    return {
      placementsPositionsWithAliases,
    }
  },
  template: `
    <div style="padding: 0 5rem; display: flex; flex-direction: column; gap: 2.5rem;">
      <va-badge
        v-for="placement in placementsPositionsWithAliases"
        :key="placement"
        :text="placement"
        :placement="placement"
        overlap
        dot
      >
        [anchor]
      </va-badge>
    </div>
  `,
})
addText(
  OverlapAndDot,
  'We don\'t have to go through all badge positions for this demo to work.',
  'stale',
)

export const Offset = () => ({
  components: { VaBadge },
  setup () {
    return {
      placementsPositionsWithAliases,
    }
  },
  template: `
    <div style="padding: 0 5rem; display: flex; flex-direction: column; gap: 2.5rem;">
      <va-badge
        v-for="placement in placementsPositionsWithAliases"
        :key="placement"
        :text="placement"
        :placement="placement"
        offset="1rem"
      >
        [anchor]
      </va-badge>
    </div>
  `,
})
addText(
  Offset,
  'We don\'t have to go through all badge positions for this demo to work. I\'m also not sure why do we need this demo at all',
  'stale',
)

export const Dot = () => ({
  components: { VaBadge },
  template: `
    <p>Regular:</p>
    <va-badge dot>
      [anchor]
    </va-badge>
    <br><br>
    <p>With placement:</p>
    <va-badge
      dot
      placement="bottom-start"
    >
      [anchor]
    </va-badge>
  `,
})

export const Empty = () => ({
  components: { VaBadge },
  template: `
    Default: <va-badge /><br>
    Dot: <va-badge dot /><br>
  `,
})

export const VisibleEmpty = () => ({
  components: { VaBadge },
  template: '<va-badge visible-empty />',
})

export const Transitions = () => ({
  components: { VaBadge },
  setup () {
    return {
      label: ref('1234'),
      overlap: ref(false),
      dot: ref(false),
      transparent: ref(false),
      visibleEmpty: ref(false),
    }
  },
  template: `
    Label: <input v-model="label"><br>
    Dot: <input
      type="checkbox"
      v-model="dot"
    ><br>
    VisibleEmpty: <input
      type="checkbox"
      v-model="visibleEmpty"
    ><br>
    Overlap: <input
      type="checkbox"
      v-model="overlap"
    >
    <br><br>
    <va-badge
      :transparent="transparent"
      :overlap="overlap"
      :text="label"
      :dot="dot"
      :visible-empty="visibleEmpty"
    >
      Default
    </va-badge><br>
    <va-badge
      :transparent="transparent"
      :overlap="overlap"
      :text="label"
      :dot="dot"
      :visible-empty="visibleEmpty"
    >
      <div style="width: 100px; height: 100px; border: 2px solid green;">
        Custom<br>size
      </div>
    </va-badge>
  `,
})
addText(
  Transitions,
  'Should have cyclic demo or be automated. Takes too much effort to test right now.',
  'stale',
)

export const IconInteraction = () => ({
  components: { VaBadge, VaIcon },
  template: `
    <va-badge text="I am Label">
      <template #text>
        <va-icon name="face"/>
      </template>
      slotted icon
    </va-badge>
    <br>
    <br>
    <va-badge text="I am Label">
      <template #text>
        <va-icon name="face"/>
      </template>
      <va-icon name="face"/>
    </va-badge>

    <p>With Icon</p>
    <va-badge dot>
      <va-icon name="face" />
    </va-badge>
  `,
})
addText(
  IconInteraction,
  'Leftover demo from vue-book. Not sure if we need it at the moment.',
  'stale',
)

export const ButtonInteraction = () => ({
  components: { VaBadge, VaButton },
  template: `
    <va-button>
      <va-badge text="10+">
        Button
      </va-badge>
    </va-button>
  `,
})
addText(
  ButtonInteraction,
  'We need to describe why this interaction is needed at all.',
  'stale',
)

export const CardInteraction = () => ({
  components: { VaBadge, VaCard, VaCardContent },
  template: `
    <va-badge
      text="10+"
      overlap
    >
      <va-card>
        <va-card-content>
          Overlap badge outside card
        </va-card-content>
      </va-card>
    </va-badge>
  `,
})
addText(
  CardInteraction,
  'We need to describe why this interaction is needed at all.',
  'stale',
)

export const AvatarInteraction = () => ({
  components: { VaBadge, VaAvatar },
  setup () {
    return { src: 'https://randomuser.me/api/portraits/women/5.jpg' }
  },
  template: `
    <va-badge
      label="3"
      overlap
    >
      <va-avatar :src="src" />
    </va-badge>
    &nbsp;
    <va-badge
      dot
      label="3"
    >
      <va-avatar :src="src" />
    </va-badge>
    &nbsp;
    <va-badge
      dot
      label="3"
      overlap
    >
      <va-avatar :src="src" />
    </va-badge>
    &nbsp;
    <va-badge
      dot
    >
      <va-avatar square :src="src" />
    </va-badge>
    &nbsp;
    <va-badge
      dot
      overlap
    >
      <va-avatar
        square
        :src="src"
      />
    </va-badge>
  `,
})
addText(
  AvatarInteraction,
  'We need to describe why this interaction is needed at all. Does it differ from simple square?',
  'stale',
)
