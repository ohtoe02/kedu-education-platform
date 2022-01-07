<template >
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Коллекций пока нет. <router-link to="/categories">Добавить новую коллекцию</router-link></p>
    <div v-else class="container">
    <form  @submit.prevent="createRecord">
      <div class="input-field">
        <input
            :class="{invalid: v$.description.$dirty && v$.description.required.$invalid}"
            id="description"
            type="text"
            v-model="description"
        >
        <label for="description">Название</label>
        <span
            class="helper-text invalid"
            v-if="v$.description.$dirty && v$.description.required.$invalid"
        >Введите название записи</span>
      </div>

      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
              v-for="c in categories"
              :data-icon="c.file"
              :key="c.id"
              :value="c.id"
          >{{ c.title }}</option>
        </select>
        <label>Выберите коллекцию</label>
      </div>

<!--      <div class="input-field">-->
<!--        <input-->
<!--            :class="{invalid: (v$.amount.$dirty && v$.amount.required.$invalid) || (v$.amount.$dirty && v$.amount.minValue.$invalid)}"-->
<!--            id="amount"-->
<!--            type="number"-->
<!--            v-model.number="amount"-->
<!--        >-->
<!--        <label for="amount">Сумма</label>-->
<!--        <span-->
<!--            class="helper-text invalid"-->
<!--            v-if="v$.amount.$dirty && v$.amount.minValue.$invalid"-->
<!--        >Сумма не может быть меньше {{v$.amount.minValue.$params.min}}</span>-->
<!--        <span-->
<!--            class="helper-text invalid"-->
<!--            v-if="v$.amount.$dirty && v$.amount.required.$invalid"-->
<!--        >Введите сумму</span>-->
<!--      </div>-->

      <div class="input-field">
        <div class="file-field input-field">
          <div class="btn light-blue">
            <span>Выбрать файл</span>
            <input
                ref="file"
                @change="handleFileUpload"
                type="file"
                accept="video/mp4, video/x-m4v, video/*"
            >
          </div>
          <div class="file-path-wrapper">
            <input
                id="text-file"
                class="file-path validate"
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
      <div v-if="role">
        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="private"
                v-model="type"
            />
            <span>Приватно</span>
          </label>
        </p>

        <p>
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
        </p>
      </div>

      <button class="btn waves-effect waves-light light-blue" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
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
      description: '',
      currentFile: null,
      role: true
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
    async createRecord() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }


      try {
        const videoRef = await this.$store.dispatch('uploadFile', {path: 'records', file: this.currentFile})
        await this.$store.dispatch('createRecord', {
        categoryId: this.category,
        // amount: this.amount,
        description: this.description,
        type: this.type,
        videoURL: videoRef,
        date: new Date().toJSON()
      })
        // const bill = this.type === 'private'
        //     ? this.info.bill + this.amount
        //     : this.info.bill - this.amount

        // await this.$store.dispatch('updateInfo', {bill})
        this.$message('Запись была успешно добавлена')
        this.v$.$reset()
        this.type = 'private'
        // this.amount = 1;
        this.description = ''
        this.currentFile = null
      } catch (e) {}
    },
    handleFileUpload(event) {
      this.currentFile = event.target.files[0]
    },
  },
  async mounted() {
    this.role = await this.$store.dispatch('fetchRoleInfo')
    console.log(this.role)
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
    description: { required },
    // amount: { minValue: minValue(1), required },
    currentFile: {required}
  },
}

</script>