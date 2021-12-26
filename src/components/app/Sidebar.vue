<template >
  <ul class="sidenav app-sidenav" :class="{open: isOpen}" >
    <li v-for="link in links" :key="link.url" >
      <router-link active-class="active" v-if="(!link.teacherOnly || (link.teacherOnly && isTeacher))" :exact="link.exact" :to="link.url" exact class="waves-effect waves-red pointer">{{ link.title }}</router-link>
    </li>

  </ul>
</template >

<script>
export default {
  props: ['isOpen'],
  data: () => ({
    links: [
        {title: 'Счет', url: '/', exact: true, teacherOnly: false},
        {title: 'История', url: '/history', teacherOnly: true},
        {title: 'Планирование', url: '/planning', teacherOnly: false},
        {title: 'Новая запись', url: '/record', teacherOnly: false},
        {title: 'Категории', url: '/categories', teacherOnly: false}
    ]
  }),
  computed: {
    async isTeacher() {
      const role = await this.$store.dispatch('fetchRoleInfo')
      console.log(role)
      return role
    }
  }
}
</script>