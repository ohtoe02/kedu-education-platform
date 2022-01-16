<template>
  <div>
    <div class="page-title">
      <h1>Создать урок</h1>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="container" v-else>
        <CategoryCreate @created="addNewCategory" />

<!--        <CategoryEdit-->
<!--          v-if="categories.length"-->
<!--          :key="categories.length + updateCount"-->
<!--          :categories="categories"-->
<!--          @updated="updateCategories"-->
<!--        />-->
<!--        <p v-else class="center">Коллекций пока нет</p>-->

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  name: 'categories',
  setup() {
    document.title = 'Создать урок'
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  async mounted() {
    if (this.$store.getters.info.childMode)
      this.$router.replace('/planning')
    this.categories = await this.$store.dispatch('fetchMyCategories');
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      this.$router.push('/planning')
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++
    }
  }
}
</script>