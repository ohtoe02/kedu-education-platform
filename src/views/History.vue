<template >
  <Loader v-if="loading"/>
  <div v-else>
    <div class="page-title">
      <h3>{{category ? category.title : 'Урок'}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Записей пока нет. <router-link to="/record">Добавить первую.</router-link></p>

    <section v-else>
      <HistoryTable :records="items"/>

      <Pagination
          v-model:page="page"
          :pageCount="pageCount"
          @click-handler="pageChangeHandler"
      />
    </section>
  </div>
</template >

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: 'history',
  props: ['key'],
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    category: null
  }),
  async mounted() {
    const catId = this.$route.params.id
    this.category = await this.$store.dispatch('fetchCategoryById', catId)
    this.records = await this.$store.dispatch('fetchRecords', catId)
    const categories = await this.$store.dispatch('fetchMyCategories')

    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'public' ? 'green' : 'red',
          typeText: record.type === 'public' ? 'Публично' : 'Приватно',
        }
      }))
    }
  },
  components: {
    HistoryTable
  }
}

</script>