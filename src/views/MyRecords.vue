<template >
    <div class="page-title">
      <h1 @click="$router.push('/planning')">Мои видео</h1>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Роликов пока нет. <router-link to="/record">Добавить первый.</router-link></p>

    <section class="container" v-else>
      <MyRecordsTable
          :records="items"
          :uid="uid"
          @recordRemoved="updateRecords"
      />

      <Pagination
          v-model:page="page"
          :pageCount="pageCount"
          @click-handler="pageChangeHandler"
      />
    </section>
</template >

<script>
import MyRecordsTable from "@/components/app/MyRecordsTable";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: 'my_records',
  props: ['key'],
  mixins: [paginationMixin],
  setup (){
    document.title = 'Мои видео'
  },
  data: () => ({
    uid: null,
    loading: true,
    records: [],
    category: null,
    categories: {}
  }),
  async mounted() {
    if (this.$store.getters.info.childMode)
      this.$router.push('/planning')
    const catId = this.$route.params.id
    this.records = await this.$store.dispatch('fetchMyRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.category = await this.$store.dispatch('fetchCategoryById', {id: catId})
    this.uid = await this.$store.dispatch('getUid')

    setTimeout(() => {
      this.setup(this.categories)
    },0)

    this.loading = false
  },
  methods: {
    async updateRecords() {

      setTimeout(async () => {
        this.records = await this.$store.dispatch('fetchMyRecords');
        this.setup(this.categories)
      }, 0)
    },
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        if (!record.categoryId) {
          this.records = []
          return
        }
        return {
          ...record,
          categoryName: (record.categoryId === 'empty') ? 'empty' : categories.find(c => c.id === record.categoryId).title
        }
      }))
    }
  },
  components: {
    MyRecordsTable
  }
}

</script>