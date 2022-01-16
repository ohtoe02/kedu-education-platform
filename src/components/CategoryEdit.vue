<template >
  <div>
    <div >
      <div class="container">
        <form
            @submit.prevent="editCategory"
            class="options-input"
            style="padding: 2rem; background-color: white; border-radius: 8px; filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .2))"

        >
          <div class="picture-and-inputs cat-row">
            <img height="250" width="250" class="responsive-img category-preview" :src="picture ? picture : ''" alt="">

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
          </div>

          <div class="input-field cat-row">
            <textarea v-model="description" id="textarea1" class="materialize-textarea"></textarea>
            <label for="textarea1">Описание</label>
          </div>

          <div class="cat-row">
            <div ref="chips" class="chips chips-initial">
              <input v-model="currentTag" placeholder="Тэги" @keydown.space="addChip">
            </div>
          </div>

          <p class="cat-row" v-if="this.$store.getters.info.teacher">
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

          <div class="cat-row">
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
      picture: null,
      description: ''
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
          file: this.picture,
          description: this.description
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория была обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}

    }
  },
  async mounted() {
    if (this.$store.getters.info.childMode)
      this.$router.replace('/planning')
    this.category = await this.$store.dispatch('fetchCategoryById', {id: this.catId})
    setTimeout(() => {
      this.title = this.category.title
      this.description = this.category.description
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