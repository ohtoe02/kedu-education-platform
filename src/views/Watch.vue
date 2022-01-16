<template >
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="currentRecord">
<!--      <div class="breadcrumb-wrap">-->
<!--        <router-link :to="`/history/${this.$route.params.catId}`" class="breadcrumb">Уроки</router-link>-->
<!--        <a @click.prevent class="breadcrumb">-->
<!--          {{ current.record.title }}-->
<!--        </a>-->
<!--      </div>-->
      <div class="current-videos">
        <ChildView
        v-model:currentRecord="currentRecord"
        v-model:prevRecord="prevRecord"
        v-model:nextRecord="nextRecord"
        :categoryTitle="category.title"
        :categoryId="$route.params.catId"
        />
<!--        <div class="player-out">-->
<!--          <div>-->
<!--            <div class="video-title">-->
<!--              <router-link :to="`/history/${$route.params.catId}`"><h2 style="cursor: pointer">{{category.title}}</h2></router-link>-->
<!--              <h3>{{current.record.title}}</h3>-->
<!--            </div>-->
<!--            <Player :video-u-r-l="current.record.videoURL.path" />-->

<!--&lt;!&ndash;            <small>{{ $filterDate(current.record.date) }}</small>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
    <p class="center" v-else>Урок с id={{$route.params.id}} не найден</p>
  </div>
</template >

<script >
import Player from "@/components/app/Player";
import ChildView from "@/components/ChildView";

export default {
  name: "Watch",
  components: {Player, ChildView},
  setup() {
    document.title = 'Просмотр'
  },
  data: () => ({
    loading: true,

    records: [],
    category: null,
    currentCat: null,
    categories: []
  }),
  async mounted() {
    const id = +this.$route.params.id
    const catId = this.$route.params.catId
    this.records = await this.$store.dispatch('fetchRecords', catId)

    this.categories = await this.$store.dispatch('fetchMyCategories');
    if (this.categories.length)
      this.currentCat = this.categories[0].id
    this.category = await this.$store.dispatch('fetchCategoryById', {id: catId})
    // this.category = this.categories.filter(c => {return c.id === catId})[0]
    // this.record = {
    //   ...record,
    //   categoryName: this.category.title,
    // }
    // this.current.record = this.records[id - 1]
    // if (id > 1)
    //   this.current.prevRecord = this.records[id - 2]
    // if (id < this.records.length)
    //   this.current.nextRecord = this.records[id]

    setTimeout(() => {M.updateTextFields()}, 0)
    this.loading = false
  },
  methods: {
    changeLink(link) {
      this.$router.push({path: link})
    },
    isItemIn(delta = 0) {
      const len = this.records.length
      const id = +this.$route.params.id - delta
      const diff = len - id
      return diff > 0 && diff <= len
    }
  },
  computed: {
    categoryId() {
      return `/history/${this.category.id}`
    },
    currentRecord() {
      const id = +this.$route.params.id - 1
      if (this.isItemIn(1))
        return this.records[id]
      return null
    },
    prevRecord() {
      const id = +this.$route.params.id - 2
      if (this.isItemIn(2))
        return this.records[id]
      return null
    },
    nextRecord() {
      const id = +this.$route.params.id
      if (this.isItemIn())
        return this.records[id]
      return null
    }
  }
}
</script >