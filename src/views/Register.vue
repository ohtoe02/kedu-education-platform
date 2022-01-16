<template >
  <form class="card auth-card" @submit.prevent="processRegister">
    <div class="card-content" style="padding: 32px 80px !important;">
      <span class="card-title" style="margin-bottom: 32px; line-height: 0"><img src="../assets/img/logo.png" alt=""></span>
      <div class="input-field" style="margin-bottom: 24px">
        <input
            id="email"
            type="text"
            v-model="email"
            :class="{invalid: (v$.email.$dirty && v$.email.email.$invalid)
            || (v$.email.$dirty && v$.email.required.$invalid),
            validate: !v$.email.$errors.length}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="(v$.email.$dirty && v$.email.email.$invalid)"
        >Введен некорректный Email</small>
        <small
            class="helper-text invalid"
            v-else-if="(v$.email.$dirty && v$.email.required.$invalid)"
        >Введите Email</small>
      </div>
      <div class="input-field" style="margin-bottom: 24px">
        <input
            id="password"
            type="password"
            v-model="password"
            :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid)
            || (v$.password.$dirty && v$.password.minLength.$invalid),
            validate: !v$.password.$errors.length}"
        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="(v$.password.$dirty && v$.password.required.$invalid)"
        >Введите пароль</small>
        <small
            class="helper-text invalid"
            v-if="(v$.password.$dirty && v$.password.minLength.$invalid)"
        >Пароль должен быть не менее {{v$.password.minLength.$params.min}} символов.
          Сейчас в нем {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            v-model="username"
            :class="{invalid: v$.username.$dirty && v$.username.required.$invalid,
                     validate: !v$.username.$errors.length}"
        >
        <label for="name">Имя</label>
        <small
            class="helper-text invalid"
            v-if="v$.username.$dirty && v$.username.required.$invalid"
        >Введите имя</small>
      </div>
      <p class="reg-checkbox" style="margin: 16px 0 12px 0">
        <label>
          <input type="checkbox" v-model="agree"/>
          <span :class="{
            submit: agree,
            'red-text': v$.agree.$dirty && !agree
          }">С правилами согласен</span>
        </label>
      </p>

      <div class="card-action" style="padding: 0; margin: auto; background: transparent">
          <button type="submit" class="login-button" style="background: #00A3FF; border: none; margin-bottom: 24px !important">
            <span class="login-button-text">Регистрация</span>
          </button>
          <!--        <button-->
          <!--          class="btn light-blue waves-effect waves-light auth-submit"-->
          <!--          type="submit"-->
          <!--        >-->
          <!--          <strong>Войти</strong>-->
          <!--          <i class="material-icons right">send</i>-->
          <!--        </button>-->

        <div class="divider" style="height: 2px" />

        <p class="center" style="margin: 24px 0 0 0 !important">
          Уже есть аккаунт?
          <router-link class="light-blue-text" to="/login">Войти!</router-link>
        </p>
      </div>
    </div>
  </form>
</template >


<script >
import useVuelidate from "@vuelidate/core";
import {email, required, minLength} from "@vuelidate/validators"

export default {
  name: 'register',
  setup() {
    document.title = `Регистрация`
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: '',
      username: '',
      agree: false,
      teacher: false
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    username: {required},
    agree: {checked: v => v},
  },
  methods: {
    async processRegister() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        username: this.username,
        teacher: this.teacher,
        childMode: false
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      }
      catch (e) {}
    }
  }
}

</script >

<style scoped>

.reg-checkbox {
  text-align: left;
}

input {
  border: solid 1px #303B40 !important;
  border-radius: 4px !important;
  padding: 0 8px !important;
  box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -webkit-box-sizing: border-box !important;
}

label {
  padding: 0 10px 0 10px !important;
}

.card-content>.input-field>input:last-of-type {
  margin: 0 !important;
}

.input-field>label:not(.label-icon).active {
  transform: translateY(-20px);
  transform-origin: 0 0;
}
</style>