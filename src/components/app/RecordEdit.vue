<template >
  <div>
    <div >
      <div class="container">
        <form
            @submit.prevent="editRecord"
            class="options-input"
            style="padding: 2rem; background-color: white; border-radius: 8px; filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .2))"
        >
          <div class="picture-and-inputs cat-row">
            <img height="250" width="250" class="responsive-img category-preview" :src="picture ? picture : ''" alt="">

            <div>
              <div class="input-field" style="margin: 0 0 32px 0">
                <input
                    id="name"
                    type="text"
                    v-model="title"
                    :class="{invalid: (v$.title.$dirty && v$.title.required.$invalid) || (v$.title.$dirty && v$.title.maxLength.$invalid)}"
                >
                <label for="name">Название</label>
                <span
                    class="helper-text invalid"
                    v-if="v$.title.$dirty && v$.title.required.$invalid"
                >Введите название видео</span>
              </div>

              <div class="input-field" >
                <select ref="select" v-model="category">
                  <optgroup label='Добавить в "мои видео"'>
                    <option value="empty">Мои видео</option>
                  </optgroup>
                  <optgroup label="Добавить в коллекцию">
                    <option
                        class="main-dark"
                        v-for="c in categories"
                        :data-icon="c.file"
                        :key="c.id"
                        :value="c.id"
                    >{{ c.title }}</option>
                  </optgroup>
                </select>
                <label class="main-dark">Выберите коллекцию</label>
              </div>
            </div>
          </div>

          <div class="cat-row" style="margin-top: 16px">
            <button style="width: fit-content" class="btn waves-effect confirm-button waves-light" type="submit">
              Обновить
              <i class="material-icons right">send</i>
            </button>

            <button class="right btn waves-effect red waves-light" type="button" @click="removeForm">
              Удалить
              <i class="material-icons right">clear</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template >

<script >
import useVuelidate  from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";

export default {
  name: "RecordEdit",
  setup () {
    return { v$: useVuelidate() }
  },
  props: ['catId', 'id', 'loading'],
  data() {
    return {
      category: null,
      categories: [],
      title: 'Название',
      picture: null,
    }
  },
  validations: {
    title: { required, maxLength: maxLength(40) },
  },
  methods: {
    removeForm() {
      this.$store.dispatch('removeRecord', {catId: this.catId, id: this.id})
      this.$message('Категория была удалена')
      this.$router.push('/planning')

    },
    async editRecord() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {

        const recordData = {
          id: this.id,
          categoryId: this.category,
          title: this.title,
          date: new Date().toJSON()
        }
        // await this.$store.dispatch('updateRecord', recordData)
        await this.$store.dispatch('updateEmptyRecord', {recordData, record: this.record})
        this.$message('Категория была обновлена')
        this.$emit('updated', recordData)
        this.categories = await this.$store.dispatch('fetchMyCategories');
        this.record = await this.$store.dispatch('fetchRecordById', {catId: this.catId, id: this.id})
      } catch (e) {}

    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchMyCategories');
    this.record = await this.$store.dispatch('fetchRecordById', {catId: this.catId, id: this.id})
    setTimeout(() => {
      this.title = this.record.title
      this.picture = this.record.imageURL
      this.category = this.catId
    }, 0)

    setTimeout(() => {M.updateTextFields(); this.select = M.FormSelect.init(this.$refs.select)}, 0)
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script >