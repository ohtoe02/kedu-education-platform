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
          :width="200"
          :height="200"
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
<!--        <img-->
<!--            loading="lazy"-->
<!--            class="responsive-img image-set"-->
<!--            @click="showCropper"-->
<!--            width="350"-->
<!--            :src="imgDataUrl-->
<!--              ? imgDataUrl-->
<!--              : 'https://firebasestorage.googleapis.com/v0/b/kids-edu-platform.appspot.com/o/default%2Fpictures%2Fvideo_placeholder.png?alt=media&token=d3120780-bff6-4c14-8007-1473c5c6722b'"-->
<!--            alt=""-->
<!--        >-->
        <img
            loading="lazy"
            class="responsive-img image-set"
            :class="{'invalid-img': (v$.imgDataUrl.$dirty && v$.imgDataUrl.required.$invalid)}"
            @click="showCropper"
            width="350"
            style="transition: 200ms ease-in all; filter: drop-shadow(0 0 4px rgba(0, 0, 0, .4))"
            :src="imgDataUrl
              ? imgDataUrl
              : require('../assets/img/video_placeholder.png')"
            alt=""
        >
        <div>
          <div class="input-field" style="margin: 0 0 32px 0">
            <input
                :class="{invalid: (v$.title.$dirty && v$.title.required.$invalid) || (v$.title.$dirty && v$.title.maxLength.$invalid)}"
                id="title"
                type="text"
                v-model="title"
                :disabled="uploading"
            >
            <label>Название</label>
            <span
                class="helper-text invalid"
                v-if="v$.title.$dirty && v$.title.required.$invalid"
            >Введите название записи
            </span>
            <span
                class="helper-text invalid"
                v-if="v$.title.$dirty && v$.title.maxLength.$invalid"
            >Название должно быть менее {{ v$.title.maxLength.$params.max }} символов. Сейчас {{title.length}}
            </span>
          </div>

          <div class="input-field" >
            <select :disabled="uploading" ref="select" v-model="category">
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

      <div class="input-field ">
        <div class="file-field input-field">
          <div class="btn light-blue right" :class="{'button-disabled': uploading}">
            <span>Выбрать файл</span>
            <input
                :disabled="uploading"
                :class="{'button-disabled': uploading}"
                ref="file"
                @change="handleFileUpload"
                type="file"
                accept="video/mp4, video/x-m4v, video/*"
            >
          </div>
          <div class="file-path-wrapper" style="padding: 0 10px 0 0">
            <input
                :disabled="uploading"
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
<!--        <div v-if="role" >-->
<!--            <label >-->
<!--              <input-->
<!--                  :disabled="uploading"-->
<!--                  class="with-gap"-->
<!--                  name="type"-->
<!--                  type="radio"-->
<!--                  value="private"-->
<!--                  v-model="type"-->
<!--              />-->
<!--              <span>Приватно</span>-->
<!--            </label>-->
<!--            <label>-->
<!--              <input-->
<!--                  :disabled="uploading"-->
<!--                  class="with-gap"-->
<!--                  name="type"-->
<!--                  type="radio"-->
<!--                  value="public"-->
<!--                  v-model="type"-->
<!--              />-->
<!--              <span>Публично</span>-->
<!--            </label>-->
<!--        </div>-->


        <button class="btn waves-effect waves-light light-blue" type="submit" :disabled="uploading">
          {{ buttonText }}
          <i class="material-icons right">send</i>
        </button>
      </div>
    </form>
    </div>


  </div>
</template >

<script>
import useVuelidate  from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
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
      title: '',
      currentFile: null,
      role: true,
      imgDataUrl: '',
      show: false,
      uploading: false
    }
  },
  computed: {
    ...mapGetters(['info']),
    buttonText() {
      if (this.uploading)
        return 'Загружается'
      return 'Создать'
    }
  },
  methods: {
    showCropper() {
      if (!this.uploading)
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
        this.uploading = true
        await this.$store.dispatch('createRecord', {
        categoryId: this.category,
        title: this.title,
        type: this.type,
        video: this.currentFile,
        image: this.imgDataUrl,
        date: new Date().toJSON()
      })

        this.$message('Запись была успешно добавлена')
        this.uploading = false
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
    if (this.$store.getters.info.childMode)
      this.$router.replace('/planning')
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
    title: { required, maxLength: maxLength(40) },
    currentFile: {required},
    imgDataUrl: {required},
  },
}

</script>

<style scoped>

.select-dropdown li.optgroup>span {
  color: black !important;
}

.invalid-img {
  border: 2px solid red;
}

label {
  padding: 0 10px 0 10px;
}

.card-content>.input-field>input:last-of-type {
  margin: 0 !important;
}

.input-field>label:not(.label-icon).active {
  transform: translateY(-20px);
  transform-origin: 0 0;
}

</style>