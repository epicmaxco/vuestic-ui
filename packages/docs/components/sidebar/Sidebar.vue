<template>
    <div class="sidebar__container">
        <nuxt-link class="sidebar__navlink link" to="/child1">child 1 </nuxt-link>
        <nuxt-link class="sidebar__navlink link" to="/child2">child 2</nuxt-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            
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