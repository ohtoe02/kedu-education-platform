<template >
  <div class="col s12 m6">
    <div >
      <img height="250" width="250" class="center-block category-preview" :src="picture ? picture : ''" alt="">
      <div class="">

        <form @submit.prevent="editCategory">

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

          <div ref="chips" class="chips chips-initial">
            <input v-model="currentTag" placeholder="Тэги" @keydown.space="addChip">
          </div>

          <p>
            <label>
              <input
                  class="with-gap"
                  name="type"
                  type="checkbox"
                  v-model="isPublic"
              />
              <span>Публично</span>
            </label>
          </p>

          <button class="btn waves-effect blue waves-light" type="submit">
            Обновить
            <i class="material-icons right">send</i>
          </button>

          <button class="right btn waves-effect red waves-light" type="button" @click="removeForm">
            Удалить
            <i class="material-icons right">clear</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template >

<script >
import useVuelidate  from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "CategoryEdit",
  setup () {
    return { v$: useVuelidate() }
  },
  props: ['catId', 'loading'],
  data() {
    return {
      category: null,
      title: 'Название',
      isPublic: true,
      tags: [],
      currentTag: '',
      picture: null
    }
  },
  validations: {
    title: { required },
  },
  methods: {
    addChip() {
      const chips = M.Chips.getInstance(this.$refs.chips)
      if (this.currentTag.trim())
        chips.addChip({tag: this.currentTag})
      this.currentTag = ''
    },
    removeForm() {
      this.$store.dispatch('removeCategory', {id: this.category.id, file: this.category.file.name})
      this.$message('Категория была удалена')
      this.$router.push('/planning')

    },
    async editCategory() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {

        const categoryData = {
          id: this.category.id,
          title: this.title,
          tags: this.tags.map(i => i.tag),
          isPublic: this.isPublic,
          file: this.picture
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория была обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}

    }
  },
  async mounted() {
    this.category = await this.$store.dispatch('fetchCategoryById', {id: this.catId})
    setTimeout(() => {
      this.title = this.category.title
      this.picture = this.category.file
      this.isPublic = this.category.isPublic
      const tags = this.category.tags
      M.Chips.init(this.$refs.chips)
      const chips = M.Chips.getInstance(this.$refs.chips);
      tags.forEach(tag => chips.addChip({tag}))
      this.tags = chips.chipsData
    }, 0)
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