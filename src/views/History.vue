<template >
  <Loader v-if="loading"/>
  <div v-else>
    <div class="page-title">
      <h1 @click="$router.push('/planning')">{{category ? category.title : 'Урок'}}</h1>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Записей пока нет. <router-link to="/record">Добавить первую.</router-link></p>

    <section class="container" v-else>
      <HistoryTable
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
  </div>
</template >

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: 'history',
  props: ['key'],
  mixins: [paginationMixin],
  setup () {
    document.title = 'Просмотр категории'
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
      this.$router.replace('/planning')
    const catId = this.$route.params.id
    this.records = await this.$store.dispatch('fetchRecords', catId)
    this.category = await this.$store.dispatch('fetchCategoryById', {id: catId})
    this.uid = await this.$store.dispatch('getUid')

    setTimeout(() => {
      this.setup(this.categories)
    },0)

    this.loading = false
  },
  methods: {
    async updateRecords() {
      this.records = await this.$store.dispatch('fetchRecords', this.$route.params.id)
      this.setup(this.categories)
    },
    setup() {
      this.setupPagination(this.records.map(record => {
        return {
          ...record
        }
      }))
    }
  },
  components: {
    HistoryTable
  }
}

</script>