<template >
  <ul class="pagination">
    <li :class="{
      disabled: page === 1,
      'waves-effect': page !== 1
    }"
        @click="page > 1 ? handleClick(page - 1) : null"
    ><a @click.prevent><i class="material-icons">chevron_left</i></a></li>
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
    <li :class="{
      disabled: page === pageCount,
      'waves-effect': page !== pageCount
    }"
        @click="page < pageCount ? handleClick( page + 1) : null"
    ><a @click.prevent href=""><i class="material-icons">chevron_right</i></a></li>
  </ul>
</template >

<script >
export default {
  name: "Pagination",
  props: ['pageCount', 'page'],
  methods: {
    handleClick(page) {
      this.$emit('click-handler', page)
    }
  }
}
</script >