<template >
  <div>
    <div class="page-title">
      <h1>Редактировать запись</h1>
    </div>

    <Loader v-if="loading"/>

    <CategoryEdit
        v-model:loading="loading"
        v-else
        :catId="$route.params.id"
    />


  </div>
</template >

<script>
import useVuelidate  from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import {mapGetters} from 'vuex'
import CategoryEdit from "@/components/CategoryEdit";

export default {
  name: 'edit-category',
  components: {CategoryEdit},
  setup () {
    document.title = 'Редактировать категорию'
    return { v$: useVuelidate() }
  },
  data() {
    return {
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'private',
      description: '',
      currentFile: null,
      role: true
    }
  },
  computed: {
    ...mapGetters(['info']),
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
        description: this.description,
        type: this.type,
        videoURL: videoRef,
        date: new Date().toJSON()
      })
        this.$message('Запись была успешно добавлена')
        this.v$.$reset()
        this.type = 'private'
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
    // this.categories = await this.$store.dispatch('fetchCategories');
    this.categories = await this.$store.dispatch('fetchMyCategories');

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {M.updateTextFields(); this.select = M.FormSelect.init(this.$refs.select)}, 0)
    this.loading = false
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  validations: {
    description: { required },
    currentFile: {required}
  },
}

</script>