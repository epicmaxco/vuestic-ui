<template>
    <div class="sidebar__container">
        <nuxt-link v-for="(link, index) in links" :key="index" class="sidebar__navlink link" :to="link.path">{{link.text}}</nuxt-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            links: [
                {
                    text: 'Child 1',
                    path: '/child1'
                },
                {
                    text: 'Child 2',
                    path: '/child2'
                }
            ]            
        }
    }
    
})
</script>

<style lang="scss" scoped>
  @import '../../../ui/src/components/vuestic-sass/resources/resources';
  @import '../../../ui/src/components/vuestic-sass/global/typography';
    .sidebar__container {
        display: flex;
        align-content: center;
        flex-flow: column nowrap;
        background: #F4F8FA;
        width: 250px;
        min-width: 250px;
        .sidebar__navlink {
            padding: 5px;
            text-decoration: none;
            
        }
    }
</style>