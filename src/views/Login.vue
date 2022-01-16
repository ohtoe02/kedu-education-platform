<template>
  <form class="card auth-card" @submit.prevent="processLogin">
    <div class="card-content" style="padding: 32px 80px !important;" >
      <span class="card-title" style="margin-bottom: 32px; line-height: 0"><img src="../assets/img/logo.png" alt=""></span>
      <div class="input-field" style="margin-bottom: 32px">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: (v$.email.$dirty && v$.email.email.$invalid) || (v$.email.$dirty && v$.email.required.$invalid)}"
        >
        <label for="email">Почта/Логин</label>
        <small
            class="helper-text invalid"
            v-if="(v$.email.$dirty && v$.email.required.$invalid)"
        >Введите Email</small>
        <small
            class="helper-text invalid"
            v-else-if="(v$.email.$dirty && v$.email.email.$invalid)"
        >Введен некорректный Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)}"

        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="(v$.password.$dirty && v$.password.required.$invalid)"
        >Введите пароль</small>
        <small
            class="helper-text invalid"
            v-else-if="(v$.password.$dirty && v$.password.minLength.$invalid)"
        >Пароль должен быть не менее {{v$.password.minLength.$params.min}} символов. Сейчас в нем {{password.length}}</small>
      </div>

    <div class="card-action" style="padding: 0; margin: auto; background: transparent">
      <div>
        <button type="submit" class="login-button" style="background: #00A3FF; border: none; margin: 40px 0 24px 0 !important">
          <span class="login-button-text">Войти</span>
        </button>
<!--        <button-->
<!--          class="btn light-blue waves-effect waves-light auth-submit"-->
<!--          type="submit"-->
<!--        >-->
<!--          <strong>Войти</strong>-->
<!--          <i class="material-icons right">send</i>-->
<!--        </button>-->
      </div>

      <div class="divider" style="height: 2px"></div>

      <p class="center" style="margin: 24px 0 0 0 !important">
        Нет аккаунта?
        <router-link class="light-blue-text" to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
    </div>
  </form>
</template>

<script>
import useVuelidate  from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import messages from "@/utils/messages";


export default {
  name: "login",
  setup () {
    document.title = `Вход`
    return { v$: useVuelidate() }
  },
  data(){
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async processLogin() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  },
};
</script>

<style scoped>

input {
  border: solid 1px #303B40 !important;
  border-radius: 4px !important;
  padding: 0 8px 0 8px !important;
  box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -webkit-box-sizing: border-box !important;
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