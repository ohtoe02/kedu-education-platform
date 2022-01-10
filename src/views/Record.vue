<template >
  <div>
    <div class="page-title">
      <h1>Загрузить видео</h1>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Коллекций пока нет. <router-link to="/categories">Добавить новую коллекцию</router-link></p>
    <div v-else class="container"  >
      <Cropper
          field="img"
          v-model="show"
          @crop-success="cropSuccess"
          :width="350"
          :height="350"
          langType="ru"
          :noCircle="true"
          img-format="png"
      />
    <form
        @submit.prevent="createRecord"
        class="options-input"
        style="padding: 2rem; background-color: white; border-radius: 8px; filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .2))"
    >
      <div class="picture-and-inputs cat-row">
        <img
            loading="lazy"
            class="responsive-img image-set"
            @click="showCropper"
            width="350"
            :src="imgDataUrl
              ? imgDataUrl
              : 'https://firebasestorage.googleapis.com/v0/b/kids-edu-platform.appspot.com/o/default%2Fpictures%2Fvideo_placeholder.png?alt=media&token=d3120780-bff6-4c14-8007-1473c5c6722b'"
            alt=""
        >
        <div>
          <div class="input-field" style="margin: 0 0 32px 0">
            <input
                :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
                id="title"
                type="text"
                v-model="title"
            >
            <label>Название</label>
            <span
                class="helper-text invalid"
                v-if="v$.title.$dirty && v$.title.required.$invalid"
            >Введите название записи</span>
          </div>

          <div class="input-field" >
            <select ref="select" v-model="category">
              <option
                  class="main-dark"
                  v-for="c in categories"
                  :data-icon="c.file"
                  :key="c.id"
                  :value="c.id"
              >{{ c.title }}</option>
            </select>
            <label class="main-dark">Выберите коллекцию</label>
          </div>
        </div>
      </div>

      <div class="input-field ">
        <div class="file-field input-field">
          <div class="btn light-blue right">
            <span>Выбрать файл</span>
            <input
                ref="file"
                @change="handleFileUpload"
                type="file"
                accept="video/mp4, video/x-m4v, video/*"
            >
          </div>
          <div class="file-path-wrapper" style="padding: 0 10px 0 0">
            <input
                id="text-file"
                class="file-path validate main-dark"
                type="text"
                :value="currentFile ? currentFile.name : undefined"
                placeholder="Загрузите ваш видео-урок"
                :class="{invalid: (v$.currentFile.$dirty && v$.currentFile.required.$invalid), valid: currentFile}"
            >
            <span
                class="helper-text invalid"
                v-if="v$.currentFile.$dirty && v$.currentFile.required.$invalid"
            >Добавьте видео-урок</span>
          </div>
        </div>
      </div>
      <div class="cat-row">
        <div v-if="role" >
            <label >
              <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="private"
                  v-model="type"
              />
              <span>Приватно</span>
            </label>
            <label>
              <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="public"
                  v-model="type"
              />
              <span>Публично</span>
            </label>
        </div>


        <button class="btn waves-effect waves-light light-blue" type="submit" >
          Создать
          <i class="material-icons right">send</i>
        </button>
      </div>
    </form>
    </div>


  </div>
</template >

<script>
import useVuelidate  from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import {mapGetters} from 'vuex'

export default {
  name: 'record',
  setup () {
    document.title = 'Добавить видео'
    return { v$: useVuelidate() }
  },
  data() {
    return {
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'private',
      // amount: 1,
      title: '',
      currentFile: null,
      role: true,
      imgDataUrl: '',
      show: false
    }
  },
  computed: {
    ...mapGetters(['info']),
    // canCreateRecord() {
    //   if (this.type === 'private')
    //     return true
    //
    //   return this.info.bill >= this.amount
    // }
  },
  methods: {
    showCropper() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl, field){
      this.imgDataUrl = imgDataUrl;
    },
    async createRecord() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }


      try {
        // const videoRef = await this.$store.dispatch('uploadFile', {path: 'records/', file: this.currentFile})
        // const imageRef = await this.$store.dispatch('uploadCroppedFile', {path: 'records', file: this.imgDataUrl})
        await this.$store.dispatch('createRecord', {
        categoryId: this.category,
        title: this.title,
        type: this.type,
        video: this.currentFile,
        image: this.imgDataUrl,
        date: new Date().toJSON()
      })
        // const bill = this.type === 'private'
        //     ? this.info.bill + this.amount
        //     : this.info.bill - this.amount

        // await this.$store.dispatch('updateInfo', {bill})
        this.$message('Запись была успешно добавлена')
        this.v$.$reset()
        this.type = 'private'
        this.imgDataUrl = ''
        this.title = ''
        this.currentFile = null
      } catch (e) {}
    },
    handleFileUpload(event) {
      this.currentFile = event.target.files[0]
    },
  },
  async mounted() {
    this.role = await this.$store.dispatch('fetchRoleInfo')
    this.categories = await this.$store.dispatch('fetchMyCategories');
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
    title: { required },
    // amount: { minValue: minValue(1), required },
    currentFile: {required}
  },
}

</script>