<template >
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row center container">
        <div class="col s12">
          <div class="card light-blue">
            <div class="card-content white-text">
              <h5 class="center">{{record.description}}</h5>
              <hr>
              <Player />
              <hr>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{ $filterDate(record.date, 'datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Урок с id={{$route.params.id}} не найден</p>
  </div>
</template >

<script >
import Player from "@/components/app/Player";

export default {
  name: "Watch",
  components: {Player},
  data: () => ({
    loading: true,
    record: null,
    category: null
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title,
    }

    this.loading = false
  }
}
</script >