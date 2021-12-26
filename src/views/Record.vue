<template >
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>

    <form v-else @submit.prevent="createRecord" class="form">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
          >{{ c.title }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            :class="{invalid: (v$.amount.$dirty && v$.amount.required.$invalid) || (v$.amount.$dirty && v$.amount.minValue.$invalid)}"
            id="amount"
            type="number"
            v-model.number="amount"
        >
        <label for="amount">Сумма</label>
        <span
            class="helper-text invalid"
            v-if="v$.amount.$dirty && v$.amount.minValue.$invalid"
        >Сумма не может быть меньше {{v$.amount.minValue.$params.min}}</span>
        <span
            class="helper-text invalid"
            v-if="v$.amount.$dirty && v$.amount.required.$invalid"
        >Введите сумму</span>
      </div>

      <div class="input-field">
        <input
            :class="{invalid: v$.description.$dirty && v$.description.required.$invalid}"
            id="description"
            type="text"
            v-model="description"
        >
        <label for="description">Описание</label>
        <span
            class="helper-text invalid"
            v-if="v$.description.$dirty && v$.description.required.$invalid"
        >Введите название записи</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>


  </div>
</template >

<script>
import useVuelidate  from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import {mapGetters} from 'vuex'

export default {
  name: 'record',
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'outcome',
      amount: 1,
      description: ''
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income')
        return true

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async createRecord() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        })
          const bill = this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись была успешно добавлена')
          this.v$.$reset()
          this.amount = 1;
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }

    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id
    }


    setTimeout(() => {M.updateTextFields(); this.select = M.FormSelect.init(this.$refs.select)}, 0)
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(1), required }
  },
}

</script>