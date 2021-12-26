<template >
  <div>
    <div class="page-title">
      <h3>Мои уроки</h3>
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
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      }))
    }
  },
  components: {
    HistoryTable
  }
}

</script>