<template>
  <div class="filter-wrapping">
    <input class="title-filter" type="text" name="title-filter" @input="changeFilter" v-model="filterTo" placeholder="Поиск">
  </div>
</template>

<script>
export default {
  name: "CategoriesFilter",
  props: ['filterTo'],
  emits: ['update:filterTo'],
  methods: {
    changeFilter() {
      this.$emit('update:filterTo', this.filterTo)
    }
  }
}
</script>

<style scoped>

</style>