<template >
  <nav class="navbar">
    <div class="nav-wrapper">
      <div class="navbar-left">
<!--        <a href="#" @click.prevent="$emit('toggleSidebar')">-->
<!--          <i class="material-icons black-text">dehaze</i>-->
<!--        </a>-->
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            <strong>{{ username }}</strong>
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li v-if="isTeacher">
              <router-link to="/planning" class="black-text">
                <i class="material-icons">dashboard_customize</i>Мои уроки
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template >


<script >
export default {
  data: () => ({
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
      coverTrigger: false
    })
  },
  computed: {
    username() {
      return this.$store.getters.info.username;
    },
    isTeacher() {
      return this.$store.getters.info.teacher;
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy)
      this.dropdown.destroy()
  }
}


</script >