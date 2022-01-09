<template>
  <div class="child-categories catalog-wrapper" >
    <div
        class="child-category"
        v-for="(cat, idx) of categories"
        :key="cat.id"
    >
      <div class="category">
        <router-link :to="cat.records ? `/watch/${cat.id}/1` : ''">
        <div>
          <img style="border-radius: 50%; width: 300px" loading="lazy" class="responsive-img category-preview" :src="cat.file" alt="">
        </div>
        <h5 class="main-blue" style="text-transform: uppercase">
          {{cat.title}}
        </h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChildCategoriesTable",
  props: ['categories']
}
</script>

<style scoped>

</style>