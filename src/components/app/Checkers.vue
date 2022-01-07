<template>
  <div>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="all"
            v-model="publicity"
        />
        <span>Все</span>
      </label>

      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="public"
            v-model="publicity"
        />
        <span>Публично</span>
      </label>

      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="private"
            v-model="publicity"
        />
        <span>Приватно</span>
      </label>
  </div>
</template>

<script>
export default {
  name: "Checkers",
  data: () => ({
    publicity: 'all'
  }),
  watch: {
    publicity() {
      const pub = this.publicity
      this.$emit('publicityChange', pub)
    }
  }
}
</script>

<style scoped>
</style>