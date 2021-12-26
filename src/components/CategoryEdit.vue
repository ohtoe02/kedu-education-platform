<template >
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="editCategory">
        <div class="input-field" >
          <select ref="select" v-model="currentCat">
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >{{ c.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

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

<!--        <div class="input-field">-->
<!--          <input-->
<!--              id="limit"-->
<!--              type="number"-->
<!--              v-model="limit"-->
<!--              :class="{invalid: (v$.limit.$dirty && v$.limit.required.$invalid) || (v$.limit.$dirty && v$.limit.minValue.$invalid)}"-->
<!--          >-->
<!--          <label for="limit">Лимит</label>-->
<!--          <span-->
<!--              class="helper-text invalid"-->
<!--              v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"-->
<!--          >Лимит не может быть меньше {{v$.limit.minValue.$params.min}}</span>-->
<!--          <span-->
<!--              class="helper-text invalid"-->
<!--              v-if="v$.limit.$dirty && v$.limit.required.$invalid"-->
<!--          >Введите лимит</span>-->
<!--        </div>-->

        <button class="btn waves-effect blue waves-light" type="submit">
          Обновить
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
  name: "CategoryEdit",
  setup () {
    return { v$: useVuelidate() }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      select: null,
      title: '',
      // limit: 100,
      currentCat: null
    }
  },
  validations: {
    title: { required },
    // limit: { minValue: minValue(100), required }
  },
  methods: {
    async editCategory() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {

        const categoryData = {
          id: this.currentCat,
          title: this.title,
          // limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория была обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}

    }
  },
  mounted() {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]

    this.currentCat = id;
    this.title = title;
    // this.limit = limit;

  },
  watch: {
    currentCat(catID) {
      const {title, limit} = this.categories.find(c => c.id === catID);
      this.title = title;
      // this.limit = limit
    }
  }
}
</script >