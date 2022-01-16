<template>
  <form class="card auth-card" @submit.prevent="processTeacherForm">
    <div class="card-content" style="padding: 32px 40px !important;">
      <span class="card-title" style="margin-bottom: 32px; color: var(--main-blue); font-family: 'Roboto', sans-serif; font-weight: 900; font-size: 40px; text-transform: uppercase">Запросы на статус учителя</span>

      <div style="font-size: 24px; font-weight: 600; text-align: center" v-if="!Object.keys(requests).length">Пока запросов нет</div>

      <div
          class="request"
          v-for="(req, idx) in requests"
          :key="req.uid"
      >
        <button
            style="height: 100%"
            class="btn-small green btn"
            @click="accept(req)"
        >
          <i class="material-icons">check</i>
        </button>
        <div class="credentials">
          <div>ФИО: {{req.name}}</div>
          <div style="height: 2px" class="divider"></div>
          <div>Email: {{req.email}}</div>
        </div>
        <button
            style="height: 100%"
            class="btn-small red btn"
            @click="reject(req)"
        >
          <i class="material-icons">close</i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "TeacherRequests",
  data: () => ({
    requests: {}
  }),
  async mounted() {
    this.requests = await this.$store.dispatch('fetchRequests')
  },
  methods: {
    accept(request) {
      this.$store.dispatch('acceptRequest', request)
      this.$message('Запрос принят')
      this.updateRequests()
    },
    reject(request) {
      this.$store.dispatch('rejectRequest', request)
      this.$message('Запрос отклонен')
      this.updateRequests()
    },
    async updateRequests() {
      this.requests = await this.$store.dispatch('fetchRequests')
    }
  }
}
</script>

<style scoped>
.request {
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  gap: 16px;
  padding: .5rem 1rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid gray;
  border-radius: 8px;
}

.credentials {
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2px 1fr;
}

.credentials > div:not(.divider) {
  margin: 8px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  line-height: 22px;
  color: black;
}

.request:not(:last-child) {
  margin-bottom: 16px;
}
</style>