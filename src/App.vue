<template>
  <div id="app">
    <Loader v-if="loading" />
    <component v-else :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
  import EmptyLayout from '@/layouts/EmptyLayout'
  import MainLayout from '@/layouts/MainLayout'
  import LoginLayout from "@/layouts/LoginLayout";
  export default {
    name: 'App',
    data: () => ({
      loading: true
    }),
    setup () {
      document.title = 'KEDU'
    },
    computed: {
      layout() {
        this.loading = false
        return (this.$route.meta.layout || 'empty') + '-layout'
      }
    },
    mounted() {
      this.loading = false
    },
    components: {
      EmptyLayout, MainLayout, LoginLayout
    }
  };
</script>

<style lang="css">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
