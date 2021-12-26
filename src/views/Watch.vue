<template >
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link :to="`/history/${this.$route.params.catId}`" class="breadcrumb">Уроки</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.description }}
        </a>
      </div>
      <div class="row center container">
        <div class="col s12">
          <div class="card card-out light-blue">
            <div class="card-content white-text">
              <h5 class="center">{{record.description}}</h5>
              <hr>
              <Player :video-u-r-l="record.videoURL"/>
              <hr>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{ $filterDate(record.date) }}</small>
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
    const catId = this.$route.params.catId
    const record = await this.$store.dispatch('fetchRecordById', {catId, id})
    this.category = await this.$store.dispatch('fetchCategoryById', catId)
    this.record = {
      ...record,
      categoryName: this.category.title,
    }

    this.loading = false
  },
  computed: {
    categoryId() {
      return `/history/${this.category.id}`
    }
  }
}
</script >