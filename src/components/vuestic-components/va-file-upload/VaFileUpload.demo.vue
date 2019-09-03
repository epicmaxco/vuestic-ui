<template>
  <VbDemo class="file-upload">
    <VbCard title="types" style="width: 100%">
      <p>list (default)</p>
      <va-file-upload v-model="basic"/>
      <p>single</p>
      <va-file-upload v-model="single" type="single"/>
      <p>gallery</p>
      <va-file-upload v-model="gallery" type="gallery"/>
    </VbCard>
    <VbCard title="dropzone" style="width: 100%">
      <p>list</p>
      <va-file-upload v-model="basic" dropzone/>
      <p>gallery</p>
      <va-file-upload v-model="gallery" type="gallery" dropzone/>
    </VbCard>
    <VbCard title="disabled" tyle="width: 100%">
      <va-file-upload v-model="basic" disabled/>
    </VbCard>
    <VbCard title="default files list">
      <va-file-upload v-model="defaultFileList"/>
      <va-file-upload v-model="defaultFileList" type="gallery"/>
    </VbCard>
    <VbCard title="colors" style="width: 100%">
      <va-file-upload v-model="basic" color="info"/>
      <va-file-upload v-model="gallery" type="gallery" color="info"/>
      <va-file-upload v-model="basic" dropzone color="info"/>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaFileUpload from './VaFileUpload'
export default {
  components: { VaFileUpload },
  data () {
    return {
      basic: [],
      single: [],
      gallery: [],
      defaultFileList: [
        {
          name: 'xxx.png',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          url: 'https://via.placeholder.com/150',
          size: 15000,
        },
      ],
    }
  },
}
</script>
