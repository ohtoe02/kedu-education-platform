<template >
  <div>
    <div>
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
<!--      <div class="page-subtitle">-->
<!--        <h4>Создать</h4>-->
<!--      </div>-->

      <form @submit.prevent="createCategory" class="options-input" style="padding: 2rem; background-color: white; border-radius: 8px; filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .2))">
        <div class="picture-and-inputs cat-row">
          <img
              v-tooltip="{text: 'Нажмите, чтоб загрузить заставку'}"
              loading="lazy"
              :class="{'invalid-img': (v$.imgDataUrl.$dirty && v$.imgDataUrl.required.$invalid)}"
              class="responsive-img image-set"
              @click="showCropper"
              width="350"
              style="transition: 200ms ease-in all; filter: drop-shadow(0 0 4px rgba(0, 0, 0, .4))"
              :src="imgDataUrl
              ? imgDataUrl
              : require('../assets/img/placeholder.png')"
              alt=""
          >
          <div class="input-field">
            <input
                :disabled="uploading"
                id="name"
                type="text"
                v-model="title"
                :class="{invalid: (v$.title.$dirty && v$.title.required.$invalid) || (v$.title.$dirty && v$.title.maxLength.$invalid)}"
            >
            <label for="name">Название</label>
            <span
                class="helper-text invalid"
                v-if="v$.title.$dirty && v$.title.required.$invalid"
            >Введите название категории</span>
            <span
                class="helper-text invalid"
                v-if="v$.title.$dirty && v$.title.maxLength.$invalid"
            >Название должно быть менее {{ v$.title.maxLength.$params.max }} символов. Сейчас {{title.length}}</span>
          </div>
        </div>

        <div class="input-field cat-row">
          <textarea :disabled="uploading" v-model="description" id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Описание</label>
        </div>

        <div class="input-field cat-row">
          <div ref="chips" class="chips chips-placeholder">
            <input :disabled="uploading" id="tags" placeholder="Добавьте тэг" v-model="currentTag" @focusout="addChip" @keydown.space.enter="addChip">
          </div>
        </div>

        <div class="cat-row">
          <p v-if="isTeacher">
            <label>
              <input
                  :disabled="uploading"
                  class="with-gap"
                  name="type"
                  type="checkbox"
                  v-model="isPublic"
              />
              <span>Публично</span>
            </label>
          </p>

          <button class="btn waves-effect confirm-button waves-light" type="submit" :disabled="uploading">
            {{buttonText}}
            <i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template >

<script >
import useVuelidate  from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { ref } from 'vue'
export default {
  name: "CategoryCreate",
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      show: false,
      title: '',
      previewURL: null,
      isPublic: false,
      tags: [],
      imgDataUrl: '',
      currentTag: '',
      uploading: false,
      description: ''
    }
  },
  validations: {
    title: { required, maxLength: maxLength(30) },
    imgDataUrl: {required},
  },
  mounted() {
    M.updateTextFields()
    M.Chips.init(this.$refs.chips)
    const chips = M.Chips.getInstance(this.$refs.chips);
    this.tags = chips.chipsData
  },
  methods: {
    addChip() {
      const chips = M.Chips.getInstance(this.$refs.chips)
      if (this.currentTag.trim())
        chips.addChip({tag: this.currentTag})
      this.currentTag = ''
    },
    showCropper() {
      if (!this.uploading)
        this.show = !this.show
    },
    cropSuccess(imgDataUrl, field){
      this.imgDataUrl = imgDataUrl;
    },
    async createCategory() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {
        this.uploading = true
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          isPublic: this.isPublic,
          tags: this.tags.map(i => i.tag),
          file: this.imgDataUrl,
          description: this.description
        })
        this.uploading = false
        this.description = ''
        this.title = ''
        this.isPublic = false
        this.imgDataUrl = null
        this.previewURL = null
        this.v$.$reset()
        this.$message('Категория была создана')
        this.$emit('created', category)
        M.Chips.init(this.$refs.chips)
      } catch (e) {
        throw e

      }
    },
    // async handleFileUpload(event) {
    //   const file = event.target.files[0]
    //   if (!file) return false
    //   if (!file.type.match('image.*')) return false
    //   this.selectedFile = file
    //   console.log(file)
    //   const reader = new FileReader()
    //   const that = this
    //   reader.onload = function (e) {
    //     that.previewURL = e.target.result
    //   }
    //   reader.readAsDataURL(file)
    // }
  },
  computed: {
    isTeacher() {
      return this.$store.getters.info.teacher;
    },
    buttonText() {
      if (this.uploading)
        return 'Загружается'
      return 'Создать'
    }
  },
  watch: {
    currentTag() {
      if (!this.currentTag.trim()) {
        this.currentTag = ''
      }
    }
  }
}
</script >

<style scoped>
.invalid-img {
  border: 2px solid red;
}
</style>