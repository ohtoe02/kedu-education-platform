<template >
  <ul class="sidenav app-sidenav" :class="{open: isOpen}" >
    <li v-for="link in links" :key="link.url" >
      <router-link active-class="active" :exact="link.exact" :to="link.url" exact class="waves-effect waves-red pointer">{{ link.title }}</router-link>
    </li>

  </ul>
</template >

<script>
export default {
  props: ['isOpen'],
  data: () => ({
    links: [
        {title: 'Главная', url: '/planning', exact: true, teacherOnly: false},
        {title: 'Каталог', url: '/catalog', teacherOnly: false},
        // {title: 'История', url: '/history', teacherOnly: true},
        // {title: 'Уроки', url: '/planning', teacherOnly: false},
        {title: 'Добавить видео', url: '/record', teacherOnly: true},
        {title: 'Коллекции', url: '/categories', teacherOnly: false}
    ]
  }),
  computed: {
    async isTeacher() {
      return await this.$store.dispatch('fetchRoleInfo')
    },
    availableLink() {
      return 1
    }
  }
}
</script>