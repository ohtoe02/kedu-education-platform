<template >
  <div>
    <div class="page-title">
      <h1>Мои уроки</h1>
<!--      <h4>{{$filterCurrency(info.bill, 'RUB')}}</h4>-->
    </div>
    <div v-if="!childMode" class="filters">
      <Checkers v-model:type="publicity"/>
      <CategoriesFilter v-model:filterTo="titleFilter"/>
    </div>
<!--    <CategoriesFilter v-model:filter="titleFilter" @filter="changeTitleFilter" />-->

    <CategoriesPagination
        class="center"
        v-if="!loading"
        v-model:page="page"
        :pageCount="pageCount"
        @click-handler="pageChangeHandler"
    />
    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Уроков пока нет. <router-link v-if="!childMode" to="/categories">Добавить новый урок</router-link></p>
    <p class="center" v-else-if="!filterCategories.length && categories.length">Уроков по данному запросу нет. Попробуйте сменить или чистить фильтры</p>

    <section v-if="!childMode">
      <CategoriesTable :categories="items" :isChangeable="true"/>
    </section>
    <section v-else>
      <ChildCategoriesTable :categories="items" :isChangeable="true"/>
    </section>
    <CategoriesPagination
        class="center"
        v-if="!loading"
        v-model:page="page"
        :layout="'lower'"
        :pageCount="pageCount"
        @click-handler="pageChangeHandler"
    />

  </div>
</template >

<script >
import {mapGetters} from "vuex";
import RequestFilter from "@/components/app/RequestFilter";
import Checkers from "@/components/app/Checkers";
import CategoriesFilter from "@/components/app/CategoriesFilter";
import CategoriesTable from "@/components/CategoriesTable";
import ChildCategoriesTable from "@/components/ChildCategoriesTable";
import CategoriesPagination from "@/components/app/CategoriesPagination";
import CategoriesPaginationLower from "@/components/app/CategoriesPaginationLower";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: 'planning',
  setup() {
    document.title = `Мои уроки`
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    categories: [],
    filteredCategories: {
      all: [],
      public: [],
      private: []
    },
    records: [],
    publicity: 'all',
    titleFilter: ''
  }),
  computed: {
    ...mapGetters(['info']),
    childMode() {
      return this.$store.getters.info.childMode
    },
    filterCategories() {
      return this.filteredCategories[this.publicity].filter(t => {
        if (this.titleFilter && !this.childMode)
          return t.title.toLowerCase().includes(this.titleFilter.toLowerCase())
        if (this.childMode)
          return t.records
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
      }), this.childMode ? 3 : 12)
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchMyCategories')

    if (this.childMode)
      this.categories = this.categories.filter(cat => {
        return cat.records
      })
    this.filteredCategories.all = this.categories
    this.filteredCategories.public = this.categories.filter(c => {
      if (c.isPublic)
        return c
    } )
    this.filteredCategories.private = this.categories.filter(c => {
      if (!c.isPublic)
        return c
    })

    this.setup(this.filterCategories)
    this.loading = false
  },
  components: {
    ChildCategoriesTable,
    RequestFilter,
    Checkers,
    CategoriesTable,
    CategoriesFilter,
    CategoriesPagination,
    CategoriesPaginationLower
  }
}

</script >