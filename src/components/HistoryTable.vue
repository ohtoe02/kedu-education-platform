<template >
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Категория</th>
      <th>Дата</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in recordsReverse" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.description }}</td>
      <td>{{ record.categoryName }}</td>
      <td>{{ $filterDate(record.date, 'datetime') }}</td>
      <td>
        <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
      </td>
      <td>
<!--        <button-->
<!--            v-tooltip="'Посмотреть запись'"-->
<!--            class="btn-small btn" @click="$router.push(`/detail/${record.id}`)">-->
<!--          <i class="material-icons">open_in_new</i>-->
<!--        </button>-->
        <button
            v-tooltip="'Посмотреть видео'"
            class="btn-small light-blue btn" @click="$router.push(`/watch/${record.categoryId}/${record.id}`)">
          <i class="material-icons">open_in_new</i>
        </button>
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
  computed: {
    recordsReverse() {
      return this.records.slice().reverse();
    }
  }
}
</script >