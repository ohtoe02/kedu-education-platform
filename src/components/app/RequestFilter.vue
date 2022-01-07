<template>
<div>
  <div >
    <input type="text" placeholder="Начинайте вводить название">
  </div>
  <br>
  <div >
    <select>
      <option disabled selected>Выберите область видимости</option>
      <option value="public">Публичные</option>
      <option value="private">Приватные</option>
    </select>
  </div>
  <div >
    <select>
      <option disabled selected>Выберите авторство</option>
      <option value="mine">Мои</option>
      <option value="others">Чужие</option>
    </select>
  </div>
</div>
</template>

<script>
export default {
  name: "Requests",

}
</script>

<style scoped>

</style>