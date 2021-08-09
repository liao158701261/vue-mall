<template>
  <div class="back-top" v-show="isShow" @click="backtop">
   <van-icon name="arrow-up" />
  </div>
</template>

<script>
export default {
  name: 'backtop',
  data () {
    return {
      isShow: false,
      timer: null,
      num: 1
    }
  },
  mounted () {
    window.onscroll = () => {
      const atop = document.documentElement.scrollTop || document.body.scrollTop
      if (atop >= 300) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.num = atop
    }
  },
  methods: {
    backtop () {
      this.timer = setInterval(() => {
        if (this.num <= 0) {
          clearInterval(this.timer)
        } else {
          this.num -= 20
          document.body.scrollTop = this.num
          document.documentElement.scrollTop = this.num
        }
      })
    }
  },
  beforeDestroy () {
    window.onscroll = null
  }
}
</script>

<style lang="scss" scoped>
.back-top{
  right: 10px;
  width: 44px;
  height: 44px;
  bottom: 100px;
  display: flex;
  position: fixed;
  align-items: center;
  border-radius: 30px;
  background: #ef1f1f;
  color: #fafafa;
  justify-content: center;
  .text{
    font-size: 24px;
  }
}
</style>
