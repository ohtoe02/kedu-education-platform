<template >
  <div >
    <div class="page-title">
      <h1>Каталог коллекций</h1>
      <!--      <h4>{{$filterCurrency(info.bill, 'RUB')}}</h4>-->
    </div>

    <CategoriesFilter class="filters" v-model:filterTo="titleFilter"/>
<!--    <CategoriesFilter class="filters" v-model:filterTo="titleFilter"/>-->
    <CategoriesPagination
        class="center"
        v-if="!loading"
        v-model:page="page"
        :pageCount="pageCount"
        @click-handler="pageChangeHandler"
    />
    <Loader v-if="loading"/>


    <p class="center" v-else-if="!categories.length">Каталог пуст.</p>
    <p class="center" v-else-if="!filteredCategories.length && categories.length">Уроков по данному запросу нет. Попробуйте сменить или чистить фильтры</p>

    <div v-else>
      <CategoriesTable

          :categories="items"
          :isChangeable="false"/>

    </div>


  </div>
</template >

<script >
import {mapGetters} from "vuex";
import Checkers from "@/components/app/Checkers";
import CategoriesFilter from "@/components/app/CategoriesFilter";
import CategoriesTable from "@/components/CategoriesTable";
import paginationMixin from "@/mixins/pagination.mixin";
import CategoriesPagination from "@/components/app/CategoriesPagination";
import CategoriesPaginationLower from "@/components/app/CategoriesPaginationLower";

export default {
  name: 'catalog',
  components: {CategoriesTable, Checkers, CategoriesFilter, CategoriesPagination, CategoriesPaginationLower},
  mixins: [paginationMixin],
  setup() {
    document.title = `Каталог`
  },
  data: () => ({
    loading: true,
    categories: [],
    records: [],
    titleFilter: ''
  }),
  computed: {
    ...mapGetters(['info']),
    filteredCategories() {
      return this.categories.filter(t => {
        if (this.titleFilter) {
          return t.title.toLowerCase().includes(this.titleFilter.toLowerCase())
        }
        return t
      })
    }
  },
  methods: {
    setup(categories) {
      this.setupPagination(categories.map(category => {
        return {
          ...category,
        }
      }), 6)
    }
  },
  async mounted() {
    if (this.$store.getters.info.childMode)
      this.$router.replace('/planning')
    // this.records = await this.$store.dispatch('fetchRecords')
    // const categories = await this.$store.dispatch('fetchCategories')
    const categories = await this.$store.dispatch('fetchCategories')


    this.categories = categories.filter(cat => cat.isPublic && cat.records)

    this.setup(this.filteredCategories)

    this.loading = false
  },
  watch: {
    titleFilter() {
      this.setup(this.filteredCategories)
    }
  }
}

</script >

<style scoped>



</style>