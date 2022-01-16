<template>
  <div class="empty-wrapping empty-layout">
    <router-view />
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