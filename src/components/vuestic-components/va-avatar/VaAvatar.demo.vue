<template>
  <VbDemo>
    <VbCard title="Default avatars">
        Empty
        <va-avatar></va-avatar>
        Text inserted
        <va-avatar>AA</va-avatar>
        Div inserted
        <va-avatar>
          <div>AA</div>
        </va-avatar>
    </VbCard>
    <VbCard title="Different sizes setted for avatars">
        size="small" preset for 32px avatar
        <va-avatar size="small">S</va-avatar>
        size="medium" preset for 48px avatar
        <va-avatar size="medium">M</va-avatar>
        size="large" preset for 64px avatar
        <va-avatar size="large">L</va-avatar>
        size="55px"
        <va-avatar size="55px">55</va-avatar>
        :size="66"
        <va-avatar :size="66">66</va-avatar>
    </VbCard>
    <VbCard title="Image avatars">
        src parameter passed
        <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar>
        horizontal image resized inside avatar
        <va-avatar src="https://i.imgur.com/UjiMAZj.png"></va-avatar>
        vertical image resized inside avatar
        <va-avatar src="https://cdn.pixabay.com/photo/2016/08/03/06/22/space-1565986_1280.jpg"></va-avatar>
    </VbCard>
    <VbCard title="Image/Icon inserted via slot">
        image inserted via slot
        <va-avatar >
          <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="woman">
        </va-avatar>
        icon inserted via slot
        <va-avatar>
          <va-icon name="iconicstroke iconicstroke-info"></va-icon>
        </va-avatar>
    </VbCard>
    <VbCard title="Square avatars">
        src parameter passed
        <va-avatar square src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar>
        horizontal image resized inside avatar
        <va-avatar square src="https://i.imgur.com/UjiMAZj.png"></va-avatar>
        vertical image resized inside avatar
        <va-avatar square src="https://cdn.pixabay.com/photo/2016/08/03/06/22/space-1565986_1280.jpg"></va-avatar>
    </VbCard>
    <VbCard title="Avatar with icon">
        small
        <va-avatar size="small" icon="iconicstroke iconicstroke-info"></va-avatar>
        medium
        <va-avatar icon="iconicstroke iconicstroke-info"></va-avatar>
        large
        <va-avatar size="large" icon="iconicstroke iconicstroke-info"></va-avatar>
    </VbCard>
    <VbCard title="Colored avatars">
      color="danger"
      <va-avatar color="danger"></va-avatar>
      color="warning"
      <va-avatar color="warning"></va-avatar>
      color="info"
      <va-avatar color="info"></va-avatar>
      color="coral"
      <va-avatar color="coral"></va-avatar>
      color="#00FF00"
      <va-avatar color="#00FF00"></va-avatar>
      color="rgb(135,206,250)"
      <va-avatar color="rgb(135,206,250)"></va-avatar>
    </VbCard>
    <VbCard title="Text coloring inside avatar">
      textColor="danger"
      <va-avatar textColor="danger" color="#fafafa">A</va-avatar>
      textColor="coral"
      <va-avatar textColor="coral" color="#fafafa">B</va-avatar>
      textColor="#00FF00"
      <va-avatar textColor="#00FF00" color="#fafafa">C</va-avatar>
      textColor="rgb(135,206,250)"
      <va-avatar textColor="rgb(135,206,250)" color="#fafafa">D</va-avatar>
    </VbCard>
    <VbCard title="Custom font size for avatars">
      15 px
      <va-avatar fontSize="15px">A</va-avatar>
      20 px
      <va-avatar fontSize="20px">A</va-avatar>
      30 px
      <va-avatar fontSize="30px">A</va-avatar>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaAvatar from './VaAvatar'
import VaIcon from '../va-icon/VaIcon'

export default {
  components: {
    VaAvatar,
    VaIcon,
  },
}
</script>
