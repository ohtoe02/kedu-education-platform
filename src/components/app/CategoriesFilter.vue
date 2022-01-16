<template>
  <div class="filter-wrapping input-field">
    <input class="title-filter" type="text" id="title-filter" name="title-filter" @input="changeFilter" v-model="filterTo">
    <label for="title-filter">Поиск</label>
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
.title-filter {
  display: block;
  width: 240px !important;
  text-align: left !important;
}

label {
  padding: 0 10px 0 10px;
}

input {
  border: solid 1px #303B40 !important;
  background-color: white !important;
  border-radius: 4px !important;
  padding: 0 8px 0 8px !important;
  box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -webkit-box-sizing: border-box !important;
}

.input-field>label:not(.label-icon).active {
  transform: translateY(-20px);
  transform-origin: 0 0;
}

</style>