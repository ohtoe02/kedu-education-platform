<template >
  <div>
    <div class="page-title">
      <h1>Профиль</h1>
    </div>

    <div class="profile">

    <form class="form options-input" @submit.prevent="updateInfo" style="padding: 2rem; background-color: white; border-radius: 8px; filter: drop-shadow(0 4px 4px rgba(0, 0, 0, .2))">
      <div class="input-field" style="margin-bottom: 16px">
        <input
            v-model="username"
            id="description"
            type="text"
        >
        <label for="description">Имя</label>
        <span
            class="helper-text invalid" v-if="username.length < 3">Минимальная длина имени 3 символа</span>
      </div>

      <div class="input-field">
        <input
            style="width: 4rem; text-align: center; font-weight: 500"
            v-model="parentPass"
            id="parentPass"
            :class="{invalid: (v$.parentPass.$dirty && v$.parentPass.required.$invalid || v$.parentPass.$dirty && v$.parentPass.minLength.$invalid)}"
            maxlength="4"
        >
        <label class="active" for="parentPass">Родительский пароль</label>
        <span
            class="helper-text invalid" v-if="(v$.parentPass.$dirty && v$.parentPass.required.$invalid || v$.parentPass.$dirty && v$.parentPass.minLength.$invalid)">Длина пароля должна составлять 4 символа</span>
      </div>

<!--      <br>-->

      <div class="card-action" style="padding: 0; background: transparent">
        <button type="submit" class="login-button" style="background: #00A3FF; border: none;">
          <span class="login-button-text">Обновить</span>
        </button>
      </div>
    </form>

    <TeacherModeForm v-if="!teacherState" style="margin-left: 16px" class="form options-input"/>
    <TeacherRequests v-if="admin" />
    </div>
  </div>
</template >

<script>
import TeacherModeForm from "@/components/TeacherModeForm";
import TeacherRequests from "@/components/TeacherRequests";
import useVuelidate from "@vuelidate/core";
import {required, minLength} from "@vuelidate/validators"
export default {
  components: {TeacherModeForm, TeacherRequests},
  setup() {
    document.title = 'Профиль'
    return { v$: useVuelidate() }
  },
  data: () => ({
    username: '',
    validName: true,
    teacherState: false,
    parentPass: ''
  }),
  methods: {
    updateInfo() {
      console.log(this.v$)
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      this.$store.dispatch('updateInfo', {username: this.username, parentPass: this.parentPass})
      this.$message('Данные обновлены')
      this.parentPass = ''
    }
  },
  mounted() {
    this.teacherState = this.$store.getters.info.teacher
    this.admin = this.$store.getters.info.admin ? this.$store.getters.info.admin : false
    this.username = this.$store.getters.info.username;
    setTimeout(() => {M.updateTextFields()}, 0)
  },
  validations: {
    username: {required},
    parentPass: {required, minLength: minLength(4)},
  },
}

</script>

<style scoped>
.profile {
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 80%;
}

.invalid {
  border-color: red !important;
}

label {
  padding: 0 10px 0 10px;
}

input {
  border: solid 1px #303B40 !important;
  border-radius: 4px !important;
  padding: 0 8px 0 8px !important;
  box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -webkit-box-sizing: border-box !important;
}

.input-field>label:not(.label-icon).active {
  transform: translateY(-20px);
  transform-origin: 0 0;
}


</style>