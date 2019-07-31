<template>
  <div id="app">
    <MP3Player/>
  </div>
</template>

<script>
import MP3Player from './pages/MP3Player';
import './styles/_reset.css';
import './styles/_normalize.scss';

export default {
  name: 'App',
  components: {
    MP3Player,
  },
};
</script>

<style>
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
}
</style>
