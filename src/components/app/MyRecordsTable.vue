<template >
  <table style="background-color: white; border-radius: 8px; filter: drop-shadow(0 0 4px rgba(0, 0, 0, .2))">
    <thead>
    <tr>
      <th style="padding-left: 16px">Заставка</th>
      <th>Название</th>
      <th>Категория</th>
      <th>Дата</th>
<!--      <th>Автор</th>-->
      <th>Действия</th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="(record, idx) in records"
        :key="record.id"
    >
      <td style="padding-left: 32px"><img height="50" style="border-radius: 4px; filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))" :src="record.imageURL" alt=""></td>
      <td>{{ record.title }}</td>
      <td>{{ record.categoryId !== 'empty' ? record.categoryName : 'Категория не указана' }}</td>
      <td>{{ $filterDate(record.date, 'date') }}</td>
<!--      <td>{{ setUsername(record) }}</td>-->
      <td>
        <span>
          <button
              v-tooltip="{text: 'Посмотреть видео'}"
              class="btn-small light-blue btn"
              @click="$router.push(`/watch/${record.categoryId}/${recordId(record) + 1}`)"
              style="margin-right: 1rem"
          >
            <i class="material-icons">open_in_new</i>
          </button>
          <button
              v-if="isAuthor(record)"
              v-tooltip="{text: 'Изменить видео'}"
              class="btn-small green btn"
              @click="$router.push(`/edit-record/${record.categoryId}/${record.id}`)"
              style="margin-right: 1rem"
          >
            <i class="material-icons">edit</i>
          </button>
          <button
              v-tooltip="{text: 'Удалить'}"
              class="btn-small red btn"
              style="margin-right: 1rem"
              @click="removeRecord(record)">
            <i class="material-icons">remove</i>
          </button>
        </span>
      </td>
    </tr>
    </tbody>
  </table>
</template >

<script >
export default {
  name: "my_records_table",
  data: () => ({
    users: {},
    tempRecs: []
  }),
  props: {
    records: {
      required: true,
      type: Array
    },
    uid: {
      required: true
    }
  },
  methods: {
    removeRecord(record) {
      if (this.isAuthor(record)) {
        this.$store.dispatch('removeRecord', {catId: record.categoryId, id: record.id, file: record.videoURL.name})
      }
      else {
        this.$store.dispatch('removeRecordRef', {catId: record.categoryId, id: record.id})
      }
      this.$message(`Видео "${record.title}" было удалено`)
      this.$emit('recordRemoved')
    },
    isAuthor(record) {
      const uid = this.uid
      return record.author === uid
    },
    doLog(record) {
      console.log(this.isAuthor(record))
    },
    async getUsername(record) {
      const uid = await this.$store.dispatch('getUid')
      this.$store.dispatch('fetchUsername', record.author).then((value) => {this.users[record.id] = record.author === uid ? 'Вы' : value})
    },
    setUsername(record) {
      this.getUsername(record)
      return this.users[record.id]
    },
    async setRecords(record) {
      this.tempRecs = await this.$store.dispatch('fetchRecords', record.categoryId)
    },
    recordId(record) {

      setTimeout(() => {this.setRecords(record)}, 0)
      let idx = -1
      setTimeout(() => {

        for (let i = 0; i < this.tempRecs.length; i++) {
          if (this.tempRecs[i].id === record.id) {
            idx = i
            break
          }
        }
        // debugger
      }, 100)
      debugger
      return (idx + 1)
    }
  },
  computed: {
    recordsReverse() {
      return this.records.sort(record => {return record.author}).slice().reverse();
    },
  }
}
</script >