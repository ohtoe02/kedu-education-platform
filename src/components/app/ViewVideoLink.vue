<template>
  <div class="video-link" :class="{disabled: image == false}">
    <router-link :to="link" replace >
      <img style="width: 100%; border-radius: 100%" :src="image ? image : 'https://firebasestorage.googleapis.com/v0/b/kids-edu-platform.appspot.com/o/default%2Fpictures%2Fsmiley_face.png?alt=media&token=e05fa901-0eaf-439f-92ed-197f419a1627'" alt="">
      <h5>{{title ? title : 'Конец'}}</h5>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ViewVideoLink",
  props: ['image', 'link', 'title']
}
</script>

<style scoped>

</style>