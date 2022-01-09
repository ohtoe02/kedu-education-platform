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

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!filteredCategories[publicity].length">Уроков пока нет. <router-link v-if="!childMode" to="/categories">Добавить новый урок</router-link></p>

    <section v-if="!childMode">
      <CategoriesTable :categories="filteredCategories[publicity].filter(t => {
        if (titleFilter)
          return t.title.toLowerCase().includes(titleFilter)
        return t
      })" :isChangeable="true"/>
    </section>
    <section v-else>
      <ChildCategoriesTable :categories="filteredCategories[publicity].filter(t => {
        if (titleFilter)
          return t.title.toLowerCase().includes(titleFilter)
        return t
      })" :isChangeable="true"/>
    </section>

  </div>
</template >

<script >
import {mapGetters} from "vuex";
import RequestFilter from "@/components/app/RequestFilter";
import Checkers from "@/components/app/Checkers";
import CategoriesFilter from "@/components/app/CategoriesFilter";
import CategoriesTable from "@/components/CategoriesTable";
import ChildCategoriesTable from "@/components/ChildCategoriesTable";

export default {
  name: 'planning',
  setup() {
    document.title = `Мои уроки`
  },
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
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    // const categories = await this.$store.dispatch('fetchCategories')
    const categories = await this.$store.dispatch('fetchMyCategories')

    this.filteredCategories.all = categories
    this.filteredCategories.public = categories.filter(c => {
      if (c.isPublic)
        return c
    } )
    this.filteredCategories.private = categories.filter(c => {
      if (!c.isPublic)
        return c
    })
    this.loading = false
  },
  components: {
    ChildCategoriesTable,
    RequestFilter,
    Checkers,
    CategoriesTable,
    CategoriesFilter
  }
}

</script >