<template >
  <form class="card auth-card" @submit.prevent="processTeacherForm">
    <div class="card-content" style="padding: 32px 80px !important;">
      <span class="card-title" style="user-select: none; margin-bottom: 32px; color: var(--main-blue); font-family: 'Roboto', sans-serif; font-weight: 900; font-size: 40px; text-transform: uppercase">Стать учителем</span>
      <div class="input-field" style="margin-bottom: 24px">
        <input
            id="name"
            type="text"
            class="validate"
            v-model="name"
            :class="{invalid: v$.name.$dirty && v$.name.required.$invalid,
                     validate: !v$.name.$errors.length}"
        >
        <label for="name">ФИО</label>
        <small
            class="helper-text invalid"
            v-if="v$.name.$dirty && v$.name.required.$invalid"
        >Введите имя</small>
      </div>
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
          <button type="submit" class="login-button" style="background: #00A3FF; border: none;">
            <span class="login-button-text">Создать заявку</span>
          </button>
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
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      name: '',
      agree: false
    }
  },
  validations: {
    email: {email, required},
    name: {required},
    agree: {checked: v => v},
  },
  methods: {
    async processTeacherForm() {

      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      const uid = await this.$store.dispatch('getUid')

      const formData = {
        email: this.email,
        name: this.name,
        uid
      }

      try {
        await this.$store.dispatch('teacherRequest', formData)
        this.$message('Заявка успешно оставлена')
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