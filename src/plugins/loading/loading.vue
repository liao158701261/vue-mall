<template>
  <div class="mask" v-show="isShow">
    <div class="loading">
      <img src="../../assets/img/Dual Ball-1s-200px.gif" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow:false
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  .mask{
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background-color: rgba(0,0,0,.7);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading{
    width: 100px;
    height: 100px;
  }
  img{
    width: 100%;
  }
}
</style>