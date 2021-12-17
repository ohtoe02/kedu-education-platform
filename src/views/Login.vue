<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Вход в систему</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
        >
        <label for="email">Почта/Логин</label>
        <small class="helper-text invalid">Email/Login</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
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
        <a href="/">Зарегистрироваться</a>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped>

</style>