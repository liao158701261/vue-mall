<template>
  <div class="My">
    <p class="title">我的</p>
    <div class="top">
      <div class="msg">
        <img src="../../assets/img/Bean Eater-1s-200px (1).gif" alt />
        <span>David</span>
      </div>
    </div>
    <!-- 收藏区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="购物车" @click="gocart" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="orders-o" text="地址" @click="gosite" />
    </van-grid>
    <!-- 信息区域 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- tabbar -->
    <common-tab />
    <!-- tabbar -->
  </div>
</template>

<script>
import CommonTab from "components/CommonTab.vue";
export default {
  components: { CommonTab },
  name: "my",
  methods: {
    gosite() {
      this.$router.push("/contactLists");
    },
    gocart() {
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  background-image:url(https://img2.baidu.com/it/u=3778963541,1471505020&fm=26&fmt=auto&gp=0.jpg);
  background-repeat: no-repeat; 
  background-position: 100% ;
  .msg {
    display: flex;
    img {
      width: 200px;
      height: 200px;
    }
    span {
      margin-top: 150px;
      margin-left: 50px;
      font-size: 20px;
      color: #666;
    }
  }
}
.title {
  /* border-radius: 15px; */
  size: 1px;
  height: 50px;
  line-height: 50px;
  background-color: #20a0ff;
  color: #fff;
  text-align: center;
}
</style>