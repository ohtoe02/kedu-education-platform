<template>
  <div>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="all"
            @change="changeType"
            v-model="type"
        />
        <span>Все</span>
      </label>

      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="public"
            @change="changeType"
            v-model="type"
        />
        <span>Публичные</span>
      </label>

      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="private"
            @change="changeType"
            v-model="type"
        />
        <span>Приватные</span>
      </label>
  </div>
</template>

<script>
export default {
  name: "Checkers",
  props: ['type'],
  emits: ['update:type'],
  methods: {
    changeType() {
      this.$emit('update:type', this.type)
    }
  },
  watch: {
    publicity() {
      this.$emit('publicityChange', this.publicity)
    }
  }
}
</script>

<style scoped>
</style>