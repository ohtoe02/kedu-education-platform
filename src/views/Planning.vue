<template >
  <div>
    <div class="page-title">
      <h3>Мои коллекции</h3>
<!--      <h4>{{$filterCurrency(info.bill, 'RUB')}}</h4>-->
    </div>
    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Коллекций пока нет. <router-link to="/categories">Добавить новую коллекцию</router-link></p>

    <section v-else >
      <div
          class="card light-blue lighten-3"
          style="cursor: pointer"
          v-for="(cat, idx) of categories"
          :key="cat.id"
          @click="$router.push(`/history/${cat.id}`)"
      >
        <div class="card-content category">
          <h5>
            <strong>{{cat.title}}</strong>
  <!--          {{ $filterCurrency(cat.spend, 'RUB') }} из {{ $filterCurrency(cat.limit, 'RUB') }}-->
          </h5>
  <!--        <div class="progress" v-tooltip="cat.tooltip">-->
  <!--          <div-->
  <!--              class="determinate"-->
  <!--              :class="[cat.progressColor]"-->
  <!--              :style="{width: cat.progressPercent + '%'}"-->
  <!--          ></div>-->
  <!--        </div>-->
          <div class="row">
            <img class="col responsive-img category-preview" :src="cat.file" alt="">
            <div class="category-text col offset-s1">Описание: Lorem ipsum dolor sit amet, nulla optio quisquam, saepe soluta tempora. Ipsam!.</div>
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
    async getRecordsCount(catId) {
      const records = await this.$store.dispatch('fetchRecords', catId)
      this.records.push(records)
    }
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
        ...cat,
        // progressPercent,
        // progressColor,
        // spend,
        // tooltip
      }
    })

    this.loading = false
  }
}

</script >