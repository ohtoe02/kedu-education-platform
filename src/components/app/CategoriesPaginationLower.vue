<template>
  <ul
      v-if="pageCount > 1"
      class="pagination center">
    <li
        style="margin: 0 0.25rem"
        v-for="idx in pageCount"
        :key="idx"
        :class="{
          'waves-effect': idx !== page,
          active: idx === page,
          blue: idx === page
        }"
        @click="handleClick(idx)"
    >
      <a @click.prevent>{{idx}}</a></li>
  </ul>
</template>

<script>
export default {
name: "CategoriesPaginationLower",
props: ['pageCount', 'page'],
methods: {
handleClick(page) {
this.$emit('click-handler', page)
}
}
}
</script >

<style scoped>
.navigation-button.disabled {
  background-color: #8b85a2;
  color: #ada7c5;
}

.navigation-button {
  color: white;
  margin: 0 48px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: none;
  transform: translateY(-50%);
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4));
  background-color: var(--main-dark-lighten);
  transition: 100ms ease-in-out;
}

.navigation-button i {
  text-align: center;
  font-size: 120px;
  transition: 100ms ease-in-out;
}

.nav-button-wrapper {
  position: fixed;
  top: 50vh;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: space-between;
  z-index: -4;
}

.navigation-button:not(:disabled):hover {
  background-color: #5a5277;
}

@media screen and (max-width: 1100px){
  .navigation-button {
    width: 100px;
    height: 100px;
  }

  .navigation-button i {
    font-size: 80px;
    transition: 100ms ease-in-out;
  }
}
</style>