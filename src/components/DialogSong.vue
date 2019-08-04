<template>
  <div v-bind:class="[ (pIsShow) ? 'frame-dialog-show' : 'frame-dialog-hide']"
       @click.self="$emit('close')">
    <div v-if="pIsShow" class="backboard">
      <div class="area-info">
        <div class="title">Youtube URL/vid：</div>
        <input class="field" v-model="youtube" placeholder="Please enter youtube url or vid">
      </div>
      <div class="area-info">
        <div class="title">Song：</div>
        <input class="field" v-model="song" placeholder="Please enter song title (Option)">
      </div>
      <div class="area-info">
        <div class="title">Singer：</div>
        <input class="field" v-model="singer" placeholder="Please enter singer (Option)">
      </div>
      <div class="area-btns">
        <div v-bind:class="['btn', {'is-danger': !pIsNew}]">{{(pIsNew ? 'Cancel' : 'Delete')}}</div>
        <div class="btn">{{(pIsNew ? 'Create' : 'Confirm')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogSong',
  props: {
    pIsShow: Boolean,
    pIsNew: Boolean,
    pSong: Object,
  },
  data() {
    return {
      youtube: '',        // youtube url or vid
      song: '',           // song title
      singer: '',         // singer name
    };
  },
  watch: {
    pSong(newSong) {
      if (newSong) {
        this.youtube = newSong.vid;
        this.song = newSong.title;
        this.singer = newSong.singer;
      }
      else {
        this.youtube = '';
        this.song = '';
        this.singer = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';
$color-dlg-bg: #00000099;
$outer-border-radius: 10px;
$inner-border-radius: 7px;
$color-main: hsl(0, 3%, 25%);

.frame-dialog-hide {
  width: 0;
  height: 0;
  background: #00000000;
  position: fixed;
  right: 33px;
  top: 66px;
  transition: 0.2s;
}
.frame-dialog-show {
  width: 100%;
  height: 100%;
  background: #00000099;
  position: fixed;
  right: 0;
  top: 0;
  transition: 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;
}
.backboard {
  width: 80%;
  height: auto;
  background: hsla(0, 3%, 95%, 0.8);
  border: 5px solid $color-main;
  border-radius: $outer-border-radius;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.area-info {
  width: 100%;
  height: 6rem;
  margin-top: 1.2rem;
  padding: 0.7rem 1.5rem;
  background: hsl(0, 3%, 80%);
  border: 1px solid hsl(0, 3%, 50%);
  border-radius: $inner-border-radius;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  .title {
    color: $color-main;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.5rem;
  }
  .field {
    width: 100%;
    padding: 0 5px;
    color: $color-main;
    font-size: 1.2rem;
    line-height: 1.2rem;
    outline-width: 0;
  }
}
.area-btns {
  width: 100%;
  margin-top: 3rem;
  padding: 0.7rem 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .btn {
    width: 30%;
    height: 2rem;
    border-radius: $inner-border-radius;
    color: $color-main;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.2);
      filter: drop-shadow(0 0 10px hsl(0, 3%, 25%));
    }
  }
  .is-danger {
    color: hsl(336, 100%, 50%);
    &:hover {
      filter: drop-shadow(0 0 10px hsl(336, 100%, 50%));
    }
  }
}
</style>

