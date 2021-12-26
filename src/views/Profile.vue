<template >
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="updateInfo">
      <div class="input-field">
        <input
            v-model="username"
            id="description"
            type="text"
        >
        <label for="description">Имя</label>
        <span
            class="helper-text invalid" v-if="username.length < 3">Минимальная длина имени 3 символа</span>
      </div>

      <div class="switch">
        <label>
          Режим ученика
          <input type="checkbox" v-model="teacherState" :checked="teacherState">
          <span class="lever"></span>
          Режим учителя
        </label>
      </div>

      <br>

      <button class="btn waves-effect light-blue waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template >

<script>
export default {
  data: () => ({
    username: '',
    validName: true,
    teacherState: false
  }),
  methods: {
    updateInfo() {
      if (this.username.length < 3)
        return

      this.$store.dispatch('updateInfo', {username: this.username, teacher: this.teacherState})
    }
  },
  mounted() {
    this.teacherState = this.$store.getters.info.teacher
    this.username = this.$store.getters.info.username;
    setTimeout(() => {M.updateTextFields()}, 0)
  }
}

</script>