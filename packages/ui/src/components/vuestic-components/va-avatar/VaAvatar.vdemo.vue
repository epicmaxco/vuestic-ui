<template>
  <VbDemo>
    <VbCard title="default">
      <va-avatar /> Empty
      <br>
      <va-avatar>AA</va-avatar> Text inserted
      <br>
      <va-avatar>
        <div>AA</div>
      </va-avatar> Div inserted
    </VbCard>
    <VbCard title="Different sizes setted for avatars">
      <va-avatar size="small">
        S
      </va-avatar> small
      <br>
      <va-avatar size="medium">
        M
      </va-avatar> medium
      <br>
      <va-avatar size="large">
        L
      </va-avatar> large
      <br>
      <va-avatar size="55px">
        55
      </va-avatar> 55px
      <br>
      <va-avatar :size="66">
        66
      </va-avatar> 66
      <br>
    </VbCard>
    <VbCard title="Size + flex">
      <span style="font-size: 12px;">doesn't scale down</span>
      <div style="display: flex; width: 120px;">
        <va-avatar size="small">
          S
        </va-avatar>
        <va-avatar size="medium">
          M
        </va-avatar>
        <va-avatar size="large">
          L
        </va-avatar>
      </div>
    </VbCard>
    <VbCard title="image">
      <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg" /> square image
      <br>
      <va-avatar
        portrait
        src="https://i.imgur.com/UjiMAZj.png"
      /> horizontal image
      <br>
      <va-avatar src="https://cdn.pixabay.com/photo/2016/08/03/06/22/space-1565986_1280.jpg" /> vertical image
      <br>
    </VbCard>
    <VbCard title="default slot">
      <va-avatar>
        <img
          src="https://randomuser.me/api/portraits/women/5.jpg"
          alt="woman"
        >
      </va-avatar>
      image
      <br>
      <va-avatar>
        <va-icon name="info_outline" />
      </va-avatar>
      icon
      <br>
    </VbCard>
    <VbCard title="square">
      <va-avatar square>
        AA
      </va-avatar>
      <va-avatar
        square
        src="https://randomuser.me/api/portraits/women/5.jpg"
      />
    </VbCard>
    <VbCard title="Avatar with icon">
      <va-avatar
        size="small"
        icon="info_outline"
      /> small
      <br>
      <va-avatar icon="info_outline" /> medium
      <br>
      <va-avatar
        size="large"
        icon="info_outline"
      /> large
      <br>
    </VbCard>
    <VbCard title="сolor">
      <va-avatar color="danger">
        A
      </va-avatar> background
      <va-avatar text-color="danger">
        A
      </va-avatar> text
    </VbCard>
    <VbCard title="font size">
      <va-avatar font-size="15px">
        A
      </va-avatar>
    </VbCard>
    <VbCard title="loading">
      <va-avatar loading />
    </VbCard>
    <VbCard title="gravatar">
      <va-avatar email="example@mail.com" />
    </VbCard>
    <BadgeAvatarDemo />
  </VbDemo>
</template>

<script>
import VaAvatar from './index'
import VaIcon from '../va-icon'
import BadgeAvatarDemo from '../va-badge/BadgeAvatarDemo'

export default {
  components: {
    BadgeAvatarDemo,
    VaAvatar,
    VaIcon,
  },
}
</script>
