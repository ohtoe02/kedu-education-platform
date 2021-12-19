<template >
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createCategory">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
          >
          <label for="name">Название</label>
          <span
              class="helper-text invalid"
              v-if="v$.title.$dirty && v$.title.required.$invalid"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="limit"
              :class="{invalid: (v$.limit.$dirty && v$.limit.required.$invalid) || (v$.limit.$dirty && v$.limit.minValue.$invalid)}"
          >
          <label for="limit">Лимит</label>
          <span
              class="helper-text invalid"
              v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
          >Лимит не может быть меньше {{v$.limit.minValue.$params.min}}</span>
          <span
              class="helper-text invalid"
              v-if="v$.limit.$dirty && v$.limit.required.$invalid"
          >Введите лимит</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template >

<script >
import useVuelidate  from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
export default {
  name: "CategoryCreate",
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      title: '',
      limit: 100
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100), required }
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async createCategory() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.v$.$reset()
        this.$message('Категория была создана')
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script >