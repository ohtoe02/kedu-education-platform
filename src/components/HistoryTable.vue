<template >
  <table style="background-color: white; border-radius: 8px; filter: drop-shadow(0 0 4px rgba(0, 0, 0, .2))">
    <thead>
    <tr>
      <th>Заставка</th>
      <th>Название</th>
<!--      <th v-if="$route.name === 'my_records'">Категория</th>-->
      <th>Дата</th>
      <th>Действия</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in records" :key="record.id">
      <td style="padding-left: 32px"><img height="50" style="border-radius: 4px; filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))" :src="record.imageURL" alt=""></td>
      <td>{{ record.title }}</td>
<!--      <td v-if="$route.name === 'my_records'">{{ record.categoryName }}</td>-->
      <td>{{ $filterDate(record.date, 'datetime') }}</td>
      <td>
        <span>
          <button
              v-tooltip="{text: 'Посмотреть видео'}"
              class="btn-small light-blue btn"
              @click="$router.push(`/watch/${record.categoryId}/${idx + 1}`)"
              style="margin-right: 1rem"
          >
            <i class="material-icons">open_in_new</i>
          </button>
          <button
              v-if="isAuthor(record)"
              v-tooltip="{text: 'Удалить'}"
              class="btn-small red btn"
              style="margin-right: 1rem"
              @click="removeRecord(record)">
            <i class="material-icons">remove</i>
          </button>
          <button
              v-if="!isAuthor(record)"
              v-tooltip="{text: 'Добавить себе'}"
              class="btn-small green btn"
              @click="addRecord(record)">
            <i class="material-icons">add</i>
          </button>
        </span>
      </td>
    </tr>
    </tbody>
  </table>
</template >

<script >
export default {
  name: "historytable",
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
        this.$store.dispatch('removeRecord', {catId: record.categoryId, id: record.id})
      }
      else {
        this.$store.dispatch('removeRecordRef', {catId: record.categoryId, id: record.id})
      }
      this.$message(`Видео "${record.title}" было удалено`)
      this.$emit('recordRemoved')
    },
    addRecord(record) {
      this.$store.dispatch('addRecord', record)
      this.$message(`Видео "${record.title}" было добавлен`)
    },
    isAuthor(record) {
      const uid = this.uid
      return record.author === uid
    },
    doLog(record) {
      console.log(this.isAuthor(record))
    }
  },
  computed: {
    recordsReverse() {
      return this.records.slice().reverse();
    }
  }
}
</script >