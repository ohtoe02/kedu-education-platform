<template >
  <div class="nav-button-wrapper" v-if="layout !== 'lower'">
    <button
        type="button"
        class="navigation-button"
        :class="{
        // disabled: page <= 1,
        'waves-effect': page !== 1
        }"
        :style="{visibility: page <= 1 ? 'hidden' : 'visible' }"
        :disabled="page <= 1"
        @click="page > 1 ? handleClick(page - 1) : null"
    >
      <i class="material-icons">chevron_left</i>
    </button>


    <button
        type="button"
        class="navigation-button"
        :class="{
      // disabled: page >= pageCount,
      'waves-effect': page !== pageCount
      }"
        :style="{visibility: page >= pageCount ? 'hidden' : 'visible' }"
        :disabled="page >= pageCount"
        @click="page < pageCount ? handleClick( page + 1) : null"
    >
      <i class="material-icons">chevron_right</i>
    </button>

  </div>

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

</template >

<script >
export default {
  name: "CategoriesPagination",
  props: ['pageCount', 'page', 'layout'],
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
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4));
  background-color: var(--main-dark-lighten);
  transition: 100ms ease-in-out all;
}

.navigation-button i {
  text-align: center;
  font-size: 120px;
  transition: 100ms ease-in-out;
}

.nav-button-wrapper {
  transform: translateY(-50%);
  position: fixed;
  top: 50vh;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: space-between;
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