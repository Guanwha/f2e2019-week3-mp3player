<template>
  <div class="frame-player">
  </div>
</template>

<script>
export default {
  name: 'MP3Player',
};
</script>

<style lang="scss" scoped>
.frame-player {
  width: 432px;
  height: 768px;
  background: blue;
}
@media(max-width: 812px) {
  .frame-player {
    width: 100%;
    height: 100%;
    background: green;
  }
}
</style>
