<template>
  <div class="background"></div>
  <Loader v-if="loading"/>
  <div v-else>
    <div class="app-main-layout">

      <Navbar v-if="!$store.getters.info.childMode" @toggleSidebar="isOpen = !isOpen" />

<!--      <Sidebar v-model:isOpen="isOpen"/>-->

<!--      <main class="app-content" :class="{full: !isOpen}">-->
      <main class="app-content full" :class="{'child-app-content': this.$store.getters.info.childMode}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div
          ref="child-mode"
          class="fixed-action-btn"
          style="transform: scale(1.4); bottom: 48px; left: 48px; width: fit-content"
      >
        <a
           class="btn-floating btn-large red"
           @click="ToggleChildMode"
        >
          <i class="large material-icons">child_care</i>
        </a>
      </div>

      <div
          :style="{visibility: isChild ? 'hidden' : 'visible'}"
          data-target="menu"
          ref="menu"
          class="fixed-action-btn"
          style="transform: scale(1.2); bottom: 48px; right: 48px;"
      >
        <a class="btn-floating btn-large " style="background-color: var(--main-dark);  transform: scale(1.5);" >
          <i style="color: var(--main-blue);" class="large material-icons">menu</i>
        </a>
        <ul >
          <li><router-link v-tooltip="{text: 'Каталог', direction: 'left'}" to="/catalog" style="background-color: var(--main-blue)" class="btn-floating">
            <i class="material-icons">apps</i>
          </router-link></li>
          <li><router-link v-tooltip="{text: 'Мои уроки', direction: 'left'}" to="/planning" style="background-color: var(--main-red)" class="btn-floating">
            <i class="material-icons">assignment</i>
          </router-link></li>
          <li><router-link v-tooltip="{text: 'Мои видео', direction: 'left'}" to="/my-records" style="background-color: var(--main-dark-lighten)" class="btn-floating">
            <i style="color: var(--main-yellow)" class="material-icons">video_library</i>
          </router-link></li>
          <li><router-link v-tooltip="{text: 'Добавить видео', direction: 'left'}" to="/record" style="background-color: var(--main-green)" class="btn-floating">
            <i style="color: var(--main-dark)" class="material-icons">add_to_queue</i>
          </router-link></li>
          <li><router-link v-tooltip="{text: 'Создать урок', direction: 'left'}" to="/categories" style="background-color: var(--main-yellow)" class="btn-floating" >
            <i style="color: var(--main-dark); transform: scale(1.4)" class="material-icons">add</i>
          </router-link></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from "@/utils/messages";

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true,
    actionButton: null,
    entPass: '',
    modal: null
  }),
  methods: {
    ToggleChildMode() {
      // if (!this.parentPass) {
      //   this.$router.push('/profile')
      //   this.$message('Установите родительский пароль')
      //   return
      // }
      // if (!this.isChild) {
        this.$store.dispatch('updateInfo', {childMode: !this.isChild})
        this.$router.push('/planning')
      //   this.modal = M.Modal.init(this.$refs["child-mode"])
      // }
      // else if (this.entPass === this.parentPass){
      //   this.$store.dispatch('updateInfo', {childMode: !this.isChild})
      //   this.$router.push('/planning')
      //   this.entPass = ''
      //   this.modal.destroy()
      // }
    }
  },
  computed: {
    isChild() {
      return this.$store.getters.info.childMode
    },
    parentPass() {
      return this.$store.getters.info.parentPass ? this.$store.getters.info.parentPass : '11111'
    },
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    setTimeout(() => {
      this.actionButton = M.FloatingActionButton.init(this.$refs.menu);
      this.modal = M.Modal.init(this.$refs["child-mode"])
    }, 0)

    this.loading = false
  },
  beforeUnmount() {
    this.actionButton.destroy();
  },
  components: {
    Sidebar, Navbar
  }
}
</script>

<style scoped >
ul {
  padding-bottom: 16px !important;
}
li {
  transform: scale(1.3);
  margin: 32px 0
}
</style>