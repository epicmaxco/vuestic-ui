<template>
  <va-list>
    <va-list-label>
      Contacts
    </va-list-label>

    <va-item
      v-for="(contact, index) in contacts"
      :key="index"
    >
      <va-item-section avatar>
        <va-avatar>
          <img :src="contact.img">
        </va-avatar>
      </va-item-section>

      <va-item-section>
        <va-item-label>
          {{ contact.name }}
        </va-item-label>

        <va-item-label caption>
          {{ contact.address }}
        </va-item-label>
      </va-item-section>

      <va-item-section side>
        <va-icon
          name="remove_red_eye"
          color="gray"
        />
      </va-item-section>
    </va-item>
  </va-list>
</template>

<script>
export default {
  data () {
    return {
      contacts: [
        { name: 'Audrey Clay', address: '644 Vermont Court, Freelandville, Kentucky, 2619', img: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { name: 'Aguirre Klein', address: '626 Carroll Street, Roulette, Ohio, 1477', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Tucker Kaufman', address: '887 Winthrop Street, Tryon, Florida, 3912', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Herbert Keller', address: '286 NW. Shore St.Longwood, FL 32779', img: 'https://randomuser.me/api/portraits/men/5.jpg' },
      ],
    }
  },
}
</script>
