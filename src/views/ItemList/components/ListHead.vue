<template>
  <div class="list-head">
    <div class="logo">
      <img @click="$router.replace('/home')" :src="imgUrl" alt="" />
    </div>
    <div class="search" @click="goSeek">
      <van-icon size="25" name="search" />
      <span>{{ this.$route.params.cateName }}</span>
    </div>
    <van-icon name="bars" />
  </div>
</template>

<script>
import apple from "../../../assets/img/logo.png";
export default {
  data() {
    return {
      imgUrl: apple,
    };
  },
  methods: {
    goSeek() {
      this.$router.push("/seek");
    },
  },
};
</script>

<style lang="scss" scoped>
.list-head {
  position: fixed;
  left: 0;
  top: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  z-index: 10;
  width: 100%;
  background-color: rgb(255, 255, 255);
}
img {
  width: 86px;
  height: 28px;
}
.search {
  // flex:1;
  height: 36px;
  width: 205px;
  // border: 1px solid #ccc;
  border-radius: 16px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  background-color: #f3f5f7;
  margin: 0 15px;
  .van-icon {
    margin: 0 15px;
    color: rgb(51, 49, 49);
  }
}
.logo {
  margin: 0 0 0 7px;
}
</style>