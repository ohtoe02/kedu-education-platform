<template >
  <div>
    <div class="page-title">
      <h3>Мои коллекции</h3>
<!--      <h4>{{$filterCurrency(info.bill, 'RUB')}}</h4>-->
    </div>
    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Коллекций пока нет. <router-link to="/categories">Добавить новую коллекцию</router-link></p>

    <section class="row" v-else >
      <div
          class="col s3 card light-blue lighten-3"
          v-for="(cat, idx) of categories"
          :key="cat.id"
      >
        <div class="card-content category">
          <h5>
            <strong>{{cat.title}}</strong>
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
            <img class="col responsive-img category-preview" :src="cat.file" alt="">
            <div class="col category-text"><p><strong>Всего уроков: {{cat.records.keys.length}}</strong></p></div>
          </div>
          <hr style="border-color: lightskyblue">
          <div class="row">
            <button
                class="col btn waves-effect blue lighten-1 waves-light"
                @click="$router.push(`/history/${cat.id}`)"
                style="margin-right: 1.5rem"
            >Открыть</button>
            <button
                class="col btn waves-effect red lighten-2 waves-light"
            >Изменить</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template >

<script >
import {mapGetters} from "vuex";

export default {
  name: 'planning',
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
    const categories = await this.$store.dispatch('fetchCategories')


    this.categories = categories.map(cat => {
      // const spend = records
      //     .filter(r => r.categoryId === cat.id)
      //     .filter(r => r.type === 'outcome')
      //     .reduce((total, record) => {
      //       return total += +record.amount
      //     }, 0)

      // const percent = 100 * spend / cat.limit;
      // const progressPercent = percent > 100 ? 100 : percent
      // const progressColor = percent < 60
      //     ? 'green'
      //     : percent < 100
      //         ? 'yellow'
      //         : 'red'
      //
      // const tooltipValue = cat.limit - spend
      // const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${this.$filterCurrency(Math.abs(tooltipValue))}`

      return {
        ...cat
      }
    })

    this.loading = false
  },
  metaInfo: {
    title: 'Мои коллекции',
    titleTemplate: null
  },
}

</script >