<template >
  <div class="col s12 m6">
    <div>
<!--      <div class="page-subtitle">-->
<!--        <h4>Создать</h4>-->
<!--      </div>-->

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
          <div class="file-field input-field">
            <div class="btn light-blue">
              <span>Выбрать файл</span>
              <input ref="file" @change="handleFileUpload" type="file" accept="image/*">
            </div>
            <div class="file-path-wrapper">
              <input
                  id="file"
                  class="file-path validate"
                  :class="{
                invalid: v$.selectedFile.$dirty && v$.selectedFile.required.$invalid,
                valid: selectedFile
                  }"
                  :value="selectedFile ? selectedFile.name : undefined"
                  type="text"
                  placeholder="Загрузите заставку коллекции"
              >
              <span
                  class="helper-text invalid"
                  v-if="v$.selectedFile.$dirty && v$.selectedFile.required.$invalid"
              >Добавьте изображение коллекции</span>
            </div>
          </div>
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

        <button class="btn waves-effect light-blue waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
        <img class="preview card-image " :src="previewURL" v-if="previewURL" alt="">
      </form>
    </div>
  </div>
</template >

<script >
import useVuelidate  from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { ref } from 'vue'
export default {
  name: "CategoryCreate",
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      title: '',
      selectedFile: null,
      previewURL: null,
      limit: 100
    }
  },
  validations: {
    title: { required },
    selectedFile: {required},
    // limit: { minValue: minValue(100), required }
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
          limit: this.limit,
          file: this.selectedFile
        })
        this.title = ''
        this.limit = 100
        this.selectedFile = null
        this.previewURL = null
        this.v$.$reset()
        this.$message('Категория была создана')
        this.$emit('created', category)
      } catch (e) {

      }
    },
    async handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return false
      if (!file.type.match('image.*')) return false
      this.selectedFile = file
      const reader = new FileReader()
      const that = this
      reader.onload = function (e) {
        that.previewURL = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script >