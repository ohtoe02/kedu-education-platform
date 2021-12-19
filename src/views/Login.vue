<template>
  <form class="card auth-card" @submit.prevent="processLogin">
    <div class="card-content">
      <span class="card-title">Вход в систему</span>
      <div class="input-field">
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
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          <strong>Войти</strong>
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
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

</style>