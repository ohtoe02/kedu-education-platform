<template>
  <div class="empty-wrapping">
    <Loader v-if="loading"/>
    <div v-else class="first-page-layout">
      <div class="left-login">
        <div class="login-info">
          <div class="login-info-title">KEDU - образовательная платформа для детей</div>
          <div class="login-info-text">Делайте ваших детей умнее благодаря множеству онлайн-уроков или создавайте собственные коллекции из уроков других пользователей.</div>
          <div class="login-button"><span class="login-button-text">О нас</span></div>
        </div>
      </div>
      <div class="right-login">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script >
import messages from "@/utils/messages";
export default {
  data: () => ({
    loading: true
  }),
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  mounted() {
    setTimeout(() => {this.loading = false}, 10)

  },
  watch: {
    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script >

<style scoped>
.solo {
  grid-template-columns: 1fr;
}
</style>