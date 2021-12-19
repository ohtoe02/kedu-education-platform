<template >
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
            v-for="cur in currencies"
            :key="cur"
            class="currency-line">
          <span>{{ currencyFilter(getCurrency(cur), cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template >

<script>

export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR']
    }
  },
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    },
    currencyFilter(value, currency='RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
      }).format(value)
    }
  }
}

</script>