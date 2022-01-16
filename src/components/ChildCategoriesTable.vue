<template>
  <div class="child-categories catalog-wrapper some-wrapper" >
    <h2 style="position: absolute; left: 50vw; top: 50vh; transform: translate(-50%) translateY(-50%)" v-if="!notEmptyCategories.length">Уроков пока нет</h2>
    <div
        v-else
        class="child-category"
        v-for="(cat, idx) of notEmptyCategories"
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
  props: ['categories'],
  computed: {
    notEmptyCategories() {
      return this.categories.filter(cat => {return cat.records})
    }
  }
}
</script>

<style scoped>
.some-wrapper>* {
  margin: auto;
  align-self: center;
}
</style>