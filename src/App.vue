<template>
  <div id="app">
    <MP3Player/>
  </div>
</template>

<script>
import MP3Player from './pages/MP3Player';

export default {
  name: 'App',
  components: {
    MP3Player,
  },
};
</script>

<style lang='scss' scoped>
@import './styles/_variables.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: $color-bg-base;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-clip: border-box;
  background-attachment: fixed;
}
</style>
