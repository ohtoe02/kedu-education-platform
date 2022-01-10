<template>
  <div class="video-title">
    <router-link :to="`/history/${$route.params.catId}`"><h2 style="cursor: pointer">{{categoryTitle}}</h2></router-link>
    <h3>{{currentRecord.title}}</h3>
  </div>
  <div >
    <div class="player-out">

      <ViewVideoLink
          style="margin: auto"
          :image="prevRecord
          ? prevRecord.imageURL
          : ''"
          :link="prevRecord
          ? `/watch/${$route.params.catId}/${$route.params.id - 1}`
          : ''"
          :title="prevRecord ? prevRecord.title : ''"
          @goTo="changeLink"
      />

      <Player
          :videoURL="currentRecord.videoURL.path"
          style="margin: auto"
      />

      <ViewVideoLink
          style="margin: auto"
          :image="nextRecord
          ? nextRecord.imageURL
          : ''"
          :link="nextRecord
          ? `/watch/${$route.params.catId}/${+$route.params.id + 1}`
          : ''"
          :title="nextRecord ? nextRecord.title : ''"
          @goTo="changeLink"
      />

      <!--            <small>{{ $filterDate(current.record.date) }}</small>-->
    </div>
  </div>
</template>

<script>
import Player from "@/components/app/Player";
import ViewVideoLink from "@/components/app/ViewVideoLink";
export default {
  name: "ChildView",
  components: {Player, ViewVideoLink},
  props: ['currentRecord', 'prevRecord', 'nextRecord', 'categoryTitle', 'categoryId'],
  methods: {
    changeLink(link) {
      this.$emit('changeLink', link)
    }
  }

}
</script>

<style scoped>

</style>