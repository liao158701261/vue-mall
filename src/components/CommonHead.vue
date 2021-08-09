<template>
  <div class="common-head">
    <van-nav-bar>
      <template #left>
        <van-image
          class="imgs"
          width="86"
          height="26"
          @click="$router.replace('/home')"
          src="https://b2b.baidu.com/static/m/img/logo_v4.ed94ed2.png"
        />
        <van-tabs v-model="active" title-active-color="#ef1f1f" color="#ef1f1f">
          <van-tab title="商品"></van-tab>
          <van-tab title="详情"></van-tab>
          <van-tab title="推荐"></van-tab>
        </van-tabs>
      </template>
      <template #right>
        <van-icon name="bars" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
   
  },
};
</script>

<style lang="scss" scoped>
.common-head {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  ::v-deep .van-icon {
    font-size: 24px;
    color: #333;
  }
  .imgs {
    margin-right: 28px;
  }
}
</style>
