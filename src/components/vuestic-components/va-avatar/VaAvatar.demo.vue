<template>
  <VbDemo>
    <VbCard title="Default avatars">
      <va-avatar></va-avatar> Empty
      <br />
      <va-avatar>AA</va-avatar> Text inserted
      <br />
      <va-avatar>
        <div>AA</div>
      </va-avatar> Div inserted
      <br />
    </VbCard>
    <VbCard title="Different sizes setted for avatars">
      <va-avatar size="small">S</va-avatar> size="small" preset for 32px avatar
      <br />
      <va-avatar size="medium">M</va-avatar> size="medium" preset for 48px avatar
      <br />
      <va-avatar size="large">L</va-avatar> size="large" preset for 64px avatar
      <br />
      <va-avatar size="55px">55</va-avatar> size="55px"
      <br />
      <va-avatar :size="66">66</va-avatar> :size="66"
      <br />
    </VbCard>
    <VbCard title="Image avatars">
      <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar> src parameter passed
      <br />
      <va-avatar portrait src="https://i.imgur.com/UjiMAZj.png"></va-avatar> horizontal image resized inside avatar
      <br />
      <va-avatar src="https://cdn.pixabay.com/photo/2016/08/03/06/22/space-1565986_1280.jpg"></va-avatar> vertical image resized inside avatar
      <br />
    </VbCard>
    <VbCard title="Image/Icon inserted via slot">
      <va-avatar>
        <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="woman" />
      </va-avatar>
      image inserted via slot
      <br />
      <va-avatar>
        <va-icon name="iconicstroke iconicstroke-info"></va-icon>
      </va-avatar>
      icon inserted via slot
      <br />
    </VbCard>
    <VbCard title="Square avatars">

      <va-avatar square src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar> src parameter passed
      <br />
      <va-avatar portrait square color="#ffffff" src="https://i.imgur.com/UjiMAZj.png"></va-avatar> horizontal image resized inside avatar
      <br />
      <va-avatar
        src="https://cdn.pixabay.com/photo/2016/08/03/06/22/space-1565986_1280.jpg"
        square
        color="#000000"
      ></va-avatar> vertical image resized inside avatar
      <br />
    </VbCard>
    <VbCard title="Avatar with icon">
      <va-avatar size="small" icon="iconicstroke iconicstroke-info"></va-avatar> small
      <br />
      <va-avatar icon="iconicstroke iconicstroke-info"></va-avatar> medium
      <br />
      <va-avatar size="large" icon="iconicstroke iconicstroke-info"></va-avatar> large
      <br />
    </VbCard>
    <VbCard title="Colored avatars">

      <va-avatar color="danger"></va-avatar> color="danger"
      <br />
      <va-avatar color="warning"></va-avatar> color="warning"
      <br />
      <va-avatar color="info"></va-avatar> color="info"
      <br />
      <va-avatar color="coral"></va-avatar> color="coral"
      <br />
      <va-avatar color="#00FF00"></va-avatar> color="#00FF00"
      <br />
      <va-avatar color="rgb(135,206,250)"></va-avatar> color="rgb(135,206,250)"
      <br />
    </VbCard>
    <VbCard title="Text coloring inside avatar">

      <va-avatar textColor="danger" color="#fafafa">A</va-avatar> textColor="danger"
      <br />
      <va-avatar textColor="coral" color="#fafafa">B</va-avatar> textColor="coral"
      <br />
      <va-avatar textColor="#00FF00" color="#fafafa">C</va-avatar> textColor="#00FF00"
      <br />
      <va-avatar textColor="rgb(135,206,250)" color="#fafafa">D</va-avatar> textColor="rgb(135,206,250)"
      <br />
    </VbCard>
    <VbCard title="Custom font size for avatars">
      <va-avatar fontSize="15px">A</va-avatar>  15 px
      <br />
      <va-avatar fontSize="20px">A</va-avatar> 20 px
      <br />
      <va-avatar fontSize="30px">A</va-avatar> 30 px
      <br />
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
