<template >
<!--  <div class="video-container">-->
<!--    <iframe :width="width" :height="height" :src="url" title="YouTube video player" frameborder="0" allow="autoplay" allowfullscreen></iframe>-->
<!--  </div>-->

  <video :width="width" class="responsive-video video-player" :autoplay="true" preload="metadata" :key="videoURL" style="height: auto" controls>
    <source :src="videoURL" type="video/mp4">
  </video>
</template >

<script >
export default {
  name: "Player",
  props: ['videoURL'],
  data: () => ({
    url: null,
    height: 504,
    width: 900
  }),
  mounted() {
    this.url = this.videoURL || 'https://www.youtube.com/embed/Mi12nUC2QKo'
  }
}
</script >