<template>
  <div>
    <!-- 头部 -->
    <common-head/>
    <!-- /头部 -->
    <common-tab/>
  </div>
</template>

<script>
import CommonTab from 'components/CommonTab.vue'
import CommonHead from 'components/CommonHead.vue'
  export default {
    components: { CommonTab ,CommonHead},
    name:'news'
  }
</script>

<style lang="scss" scoped>

</style>