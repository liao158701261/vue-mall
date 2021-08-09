<template>
  <div id="common-tab">
    <van-tabbar route active-color="#ef1f1f" inactive-color="#333">
      <van-tabbar-item to="/home" icon="shouye" icon-prefix="icon"
        >首页</van-tabbar-item
      >
      <van-tabbar-item to="/classify" icon="17" icon-prefix="icon"
        >分类</van-tabbar-item
      >
      <van-tabbar-item to="/news" icon="xiaoxi" icon-prefix="icon"
        >消息</van-tabbar-item
      >
      <van-tabbar-item to="/cart" :badge="$store.state.cart.items.length||''" icon="gouwuche" icon-prefix="icon"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/my" icon="my_icon" icon-prefix="icon"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#common-tab {
  ::v-deep .icon {
    font-size: 24px;
  }
}
</style>