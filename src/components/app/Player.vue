<template >
  <div class="video-container">
    <iframe :width="width" :height="height" :src="url" title="YouTube video player" frameborder="0" allow="autoplay" allowfullscreen></iframe>
  </div>
</template >

<script >
export default {
  name: "Player",
  props: ['videoURL'],
  data: () => ({
    url: null,
    width: 896,
    height: 504
  }),
  methods: {

  },
  computed: {
    width() {
      return this.height * (1920 / 1080)
    }
  },
  mounted() {
    this.url = this.videoURL || 'https://www.youtube.com/embed/Mi12nUC2QKo'
  }
}
</script >