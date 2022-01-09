<template >
  <table style="background-color: white; border-radius: 8px; filter: drop-shadow(0 0 4px rgba(0, 0, 0, .2))">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Категория</th>
      <th>Дата</th>
      <th>Действия</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in recordsReverse" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.title }}</td>
      <td>{{ record.categoryName }}</td>
      <td>{{ $filterDate(record.date, 'datetime') }}</td>
      <td>
<!--        <button-->
<!--            v-tooltip="'Посмотреть запись'"-->
<!--            class="btn-small btn" @click="$router.push(`/detail/${record.id}`)">-->
<!--          <i class="material-icons">open_in_new</i>-->
<!--        </button>-->
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
              @click="removeRecord(record.categoryId, record.id, record.videoURL.name)">
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
  name: "historytable",
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    removeRecord(catId, id, file) {
      this.$store.dispatch('removeRecord', {catId, id, file})
      this.$emit('recordRemoved')
    },
    async isAuthor(record) {
      return record.author === this.uid
    }
  },
  computed: {
    recordsReverse() {
      return this.records.slice().reverse();
    },
    uid() {
      return this.$store.dispatch('getUid');
    }
  }
}
</script >