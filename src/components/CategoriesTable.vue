<template>
  <div class="catalog catalog-wrapper" >
    <div
        class="col s3 card light-blue lighten-3"
        v-for="(cat, idx) of categories"
        :key="cat.id"
    >
      <div class="card-content category">
        <h5>
          <strong>{{cat.title}}</strong>
        </h5>
        <hr style="border-color: lightskyblue">
        <div>
          <img loading="lazy" class="responsive-img category-preview" :src="cat.file" alt="">
          <div class="category-text"><p><strong>Всего роликов: {{ cat.records ? Object.keys(cat.records).length : 0}}</strong></p></div>
        </div>
        <hr style="border-color: lightskyblue">
        <div class="category-buttons">
          <button
              class="btn waves-effect confirm-button waves-light"
              @click="$router.push(`/history/${cat.id}`)"
          >Открыть</button>
          <button
              v-if="isChangeable"
              @click="this.$router.push(`/edit-lesson/${cat.id}`)"
              class="btn waves-effect cancel-button waves-light"
          >Изменить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoriesTable",
  props: {
    categories: Array,
    isChangeable: Boolean
  }
}
</script>

<style scoped>

</style>