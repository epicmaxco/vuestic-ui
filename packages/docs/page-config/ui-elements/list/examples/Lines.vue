<template>
  <VaList>
    <VaListLabel> Lines </VaListLabel>

    <VaListItem
      v-for="(contact, index) in contacts"
      :key="index"
      class="list__item"
    >
      <VaListItemSection avatar>
        <VaAvatar>
          <img :src="contact.img" :alt="contact.name">
        </VaAvatar>
      </VaListItemSection>

      <VaListItemSection>
        <VaListItemLabel>
          {{ contact.name }}
        </VaListItemLabel>

        <VaListItemLabel
          caption
          :lines="index + 1"
        >
          {{ contact.text }}
        </VaListItemLabel>
      </VaListItemSection>

      <VaListItemSection icon>
        <VaIcon
          name="remove_red_eye"
          color="background-element"
        />
      </VaListItemSection>
    </VaListItem>
  </VaList>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        {
          name: "Audrey Clay",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maiores esse eum, aliquam architecto facilis, facere omnis nulla optio, odio magnam sit officia aspernatur ea quis nesciunt distinctio sequi voluptate illo. Ducimus necessitatibus natus magni. Vel incidunt id provident, consequatur sit asperiores magnam aut! Cumque, id harum ad labore qui ratione quibusdam culpa saepe, quos blanditiis accusantium ipsum distinctio laboriosam fugiat, asperiores tempora nobis incidunt expedita! Assumenda omnis officiis hic! Ipsa nemo et quidem amet similique. Sed veniam eveniet optio fuga reprehenderit, illo ipsum a voluptatem quod saepe harum quo voluptatibus fugiat tempore quos soluta sapiente temporibus quam rem quidem aspernatur, magni veritatis. Facere recusandae sunt culpa magni? Distinctio minima maxime sint deleniti labore nesciunt laboriosam a id impedit nemo. Maxime sapiente exercitationem omnis mollitia, ducimus ad sequi voluptates consequatur accusamus illum iusto et ea quidem eveniet? Rerum qui cumque aliquam iusto quia, aspernatur totam fugit omnis magnam, eligendi nulla eveniet minus labore tenetur accusantium tempora sed obcaecati! Delectus, animi! Placeat iusto recusandae hic eos neque corrupti harum sunt nemo repellat, laborum nesciunt ab numquam quod minima quia error deleniti qui, possimus deserunt. Adipisci, totam doloremque. Nostrum, corporis cum at, provident quod inventore amet nesciunt consectetur vitae explicabo animi fuga.",
          img: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        {
          name: "Aguirre Klein",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maiores esse eum, aliquam architecto facilis, facere omnis nulla optio, odio magnam sit officia aspernatur ea quis nesciunt distinctio sequi voluptate illo. Ducimus necessitatibus natus magni. Vel incidunt id provident, consequatur sit asperiores magnam aut! Cumque, id harum ad labore qui ratione quibusdam culpa saepe, quos blanditiis accusantium ipsum distinctio laboriosam fugiat, asperiores tempora nobis incidunt expedita! Assumenda omnis officiis hic! Ipsa nemo et quidem amet similique. Sed veniam eveniet optio fuga reprehenderit, illo ipsum a voluptatem quod saepe harum quo voluptatibus fugiat tempore quos soluta sapiente temporibus quam rem quidem aspernatur, magni veritatis. Facere recusandae sunt culpa magni? Distinctio minima maxime sint deleniti labore nesciunt laboriosam a id impedit nemo. Maxime sapiente exercitationem omnis mollitia, ducimus ad sequi voluptates consequatur accusamus illum iusto et ea quidem eveniet? Rerum qui cumque aliquam iusto quia, aspernatur totam fugit omnis magnam, eligendi nulla eveniet minus labore tenetur accusantium tempora sed obcaecati! Delectus, animi! Placeat iusto recusandae hic eos neque corrupti harum sunt nemo repellat, laborum nesciunt ab numquam quod minima quia error deleniti qui, possimus deserunt. Adipisci, totam doloremque. Nostrum, corporis cum at, provident quod inventore amet nesciunt consectetur vitae explicabo animi fuga.",
          img: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "Tucker Kaufman",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maiores esse eum, aliquam architecto facilis, facere omnis nulla optio, odio magnam sit officia aspernatur ea quis nesciunt distinctio sequi voluptate illo. Ducimus necessitatibus natus magni. Vel incidunt id provident, consequatur sit asperiores magnam aut! Cumque, id harum ad labore qui ratione quibusdam culpa saepe, quos blanditiis accusantium ipsum distinctio laboriosam fugiat, asperiores tempora nobis incidunt expedita! Assumenda omnis officiis hic! Ipsa nemo et quidem amet similique. Sed veniam eveniet optio fuga reprehenderit, illo ipsum a voluptatem quod saepe harum quo voluptatibus fugiat tempore quos soluta sapiente temporibus quam rem quidem aspernatur, magni veritatis. Facere recusandae sunt culpa magni? Distinctio minima maxime sint deleniti labore nesciunt laboriosam a id impedit nemo. Maxime sapiente exercitationem omnis mollitia, ducimus ad sequi voluptates consequatur accusamus illum iusto et ea quidem eveniet? Rerum qui cumque aliquam iusto quia, aspernatur totam fugit omnis magnam, eligendi nulla eveniet minus labore tenetur accusantium tempora sed obcaecati! Delectus, animi! Placeat iusto recusandae hic eos neque corrupti harum sunt nemo repellat, laborum nesciunt ab numquam quod minima quia error deleniti qui, possimus deserunt. Adipisci, totam doloremque. Nostrum, corporis cum at, provident quod inventore amet nesciunt consectetur vitae explicabo animi fuga.",
          img: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
          name: "Herbert Keller",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maiores esse eum, aliquam architecto facilis, facere omnis nulla optio, odio magnam sit officia aspernatur ea quis nesciunt distinctio sequi voluptate illo. Ducimus necessitatibus natus magni. Vel incidunt id provident, consequatur sit asperiores magnam aut! Cumque, id harum ad labore qui ratione quibusdam culpa saepe, quos blanditiis accusantium ipsum distinctio laboriosam fugiat, asperiores tempora nobis incidunt expedita! Assumenda omnis officiis hic! Ipsa nemo et quidem amet similique. Sed veniam eveniet optio fuga reprehenderit, illo ipsum a voluptatem quod saepe harum quo voluptatibus fugiat tempore quos soluta sapiente temporibus quam rem quidem aspernatur, magni veritatis. Facere recusandae sunt culpa magni? Distinctio minima maxime sint deleniti labore nesciunt laboriosam a id impedit nemo. Maxime sapiente exercitationem omnis mollitia, ducimus ad sequi voluptates consequatur accusamus illum iusto et ea quidem eveniet? Rerum qui cumque aliquam iusto quia, aspernatur totam fugit omnis magnam, eligendi nulla eveniet minus labore tenetur accusantium tempora sed obcaecati! Delectus, animi! Placeat iusto recusandae hic eos neque corrupti harum sunt nemo repellat, laborum nesciunt ab numquam quod minima quia error deleniti qui, possimus deserunt. Adipisci, totam doloremque. Nostrum, corporis cum at, provident quod inventore amet nesciunt consectetur vitae explicabo animi fuga.",
          img: "https://randomuser.me/api/portraits/men/5.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.list__item + .list__item {
  margin-top: 20px;
}
</style>
