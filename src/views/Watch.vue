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
              <h5 style="margin-bottom: 0.5rem">{{record.description}}</h5>
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
    category: null,
    currentCat: null,
    categories: []
  }),
  async mounted() {
    const id = this.$route.params.id
    const catId = this.$route.params.catId
    const record = await this.$store.dispatch('fetchRecordById', {catId, id})
    this.categories = await this.$store.dispatch('fetchMyCategories');
    if (this.categories.length)
      this.currentCat = this.categories[0].id
    console.log(this.categories)
    this.category = await this.$store.dispatch('fetchCategoryById', catId)
    // this.category = this.categories.filter(c => {return c.id === catId})[0]
    this.record = {
      ...record,
      categoryName: this.category.title,
    }

    setTimeout(() => {M.updateTextFields()}, 0)
    this.loading = false
  },
  computed: {
    categoryId() {
      return `/history/${this.category.id}`
    }
  }
}
</script >