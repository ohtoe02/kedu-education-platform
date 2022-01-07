<template >
  <div>
    <div class="page-title">
      <h3>Каталог коллекций</h3>
      <!--      <h4>{{$filterCurrency(info.bill, 'RUB')}}</h4>-->
    </div>
    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Коллекций пока нет. <router-link to="/categories">Добавить новую коллекцию</router-link></p>

    <section class="catalog catalog-wrapper" v-else >
      <div
          class="card light-blue lighten-3"
          v-for="(cat, idx) of categories"
          :key="cat.id"
      >
        <div class="card-content category">
          <h5
              class="catalog-card-title"
          >
            {{cat.title}}
          </h5>
          <hr style="border-color: lightskyblue">
          <!--        <div class="progress" v-tooltip="cat.tooltip">-->
          <!--          <div-->
          <!--              class="determinate"-->
          <!--              :class="[cat.progressColor]"-->
          <!--              :style="{width: cat.progressPercent + '%'}"-->
          <!--          ></div>-->
          <!--        </div>-->
          <!--          <div class="row">-->
          <!--            <img class="col s3 responsive-img category-preview" :src="cat.file" alt="">-->
          <!--            <div class="col s9 category-text"><p><strong>Всего уроков: {{getRecordsCount(cat.records)}}</strong> <br> Описание: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis cupiditate ea earum eos necessitatibus quo repellat repudiandae similique! Ipsum, iste, rem! Asperiores assumenda consequatur corporis culpa deserunt dolorum, earum enim est eveniet explicabo fuga fugit modi obcaecati pariatur recusandae sequi, totam ut, voluptatem. Doloribus est ipsum omnis quisquam sunt, voluptatibus..</p></div>-->
          <!--          </div>-->
          <div>
            <img class="responsive-img category-preview" :src="cat.file" alt="">
            <div class="category-text"><p><strong>Всего уроков: {{ cat.records ? Object.keys(cat.records).length : 0}}</strong></p></div>
          </div>
          <hr style="border-color: lightskyblue">
          <div class="button-row">
            <button
                class="category-button btn waves-effect blue lighten-1 waves-light"
                @click="$router.push(`/history/${cat.id}`)"
                style="padding: 0 1vmin"
            >Открыть</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template >

<script >
import {mapGetters} from "vuex";
import Checkers from "@/components/app/Checkers";

export default {
  name: 'catalog',
  components: {Checkers},
  setup() {
    document.title = `Каталог`
  },
  data: () => ({
    loading: true,
    categories: [],
    records: []
  }),
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
  },
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords')
    // const categories = await this.$store.dispatch('fetchCategories')
    const categories = await this.$store.dispatch('fetchCategories')


    this.categories = categories.map(cat => {
      return {
        ...cat
      }
    })

    this.loading = false
  }
}

</script >