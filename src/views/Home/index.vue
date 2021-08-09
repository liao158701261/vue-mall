<template>
  <div id="heom">
    <!-- 头部 -->
    <home-head />
    <!-- /头部 -->
    <div class="wrap">
      <van-pull-refresh
        v-model="isLoading"
        :head-height="80"
        @refresh="onRefresh"
      >
        <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
        <template #pulling="props">
          <img
            class="doge"
            src="../../assets/img/加载1.gif"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template>

        <!-- 释放提示 -->
        <template #loosing>
          <img class="doge" src="../../assets/img/加载1.gif" />
        </template>

        <!-- 加载提示 -->
        <template #loading>
          <img class="doge" src="../../assets/img/加载1.gif" />
        </template>
        <!-- 轮播图 -->
        <div class="Banner">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="banner in banners" :key="banner.id">
              <img :src="banner.picUrl" alt="" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- /轮播图 -->
        <!-- 宫格导航 -->
        <van-grid clickable :column-num="5">
          <van-grid-item
            v-for="cate in cates"
            :key="cate.id"
            :icon="cate.icon"
            :text="cate.name"
            @click="enterList(cate.id,cate.name)"
          />
          <van-grid-item icon="apps-o" text="更多" @click="golist"/>
        </van-grid>
        <!-- /宫格导航 -->
        <!-- 为你推荐 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <recommend :items="items" @clickItem="enterDetail" />
        </van-list>
        <!-- /为你推荐 -->
      </van-pull-refresh>
    </div>
    <!-- tabbar -->
    <common-tab />
    <!-- tabbar /-->
    <backtop/>
  </div>
</template>

<script>
import { fetchCates, fetchHomeBanner, fetchItems } from "api";
import CommonTab from "components/CommonTab";
import HomeHead from "./components/HomeHead";
import Recommend from "./components/Recommend.vue";
import backtop from 'components/backtop'
export default {
  name: "home",
  data() {
    return {
      cates: [],
      banners: [],
      items: [], //商品数据
      isLoading: false, //是否处于下拉刷新中
      page: 1,
      pageSize: 6,
      loading: false, //是否上拉触摸到底
      finished: false, //上拉是否到达最后一页
    };
  },
  created() {
    this.fetchCates();
    this.fetchBanner();
  },
  methods: {
    golist(){
       //进入列表页
      this.$router.push('/classify')
    },
    enterList(id,name){
      //进入列表页
      this.$router.push(`/itemList/a/${id}/b/${name}`)
    },
    enterDetail({ id }) {
      //进入详情页
      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
    onLoad() {
      //上拉触底了
      this.fetchItems();
      //加载下一项数据
      this.page++;
    },
    onRefresh() {
      //将下拉加载状态初始化
      //回到第一页
      this.page = 1;
      this.items = [];
      //将 上拉到达最后一页状态变成false
      this.finished = false;
      //下拉刷新触发了
      this.fetchItems();
    },
    fetchCates() {
      //请求宫格导航数据
      fetchCates().then((res) => {
        if (res.data.code === 0) {
          this.cates = res.data.data;
        }
      });
    },
    fetchBanner() {
      // 请求轮播数据
      fetchHomeBanner().then((res) => {
        if (res.data.code === 0) {
          this.banners = res.data.data;
        }
      });
    },
    fetchItems() {
      //推荐商品
      fetchItems({
        categoryId: 72399,
        page: this.page,
        pageSize: this.pageSize,
      }).then((res) => {
        this.isLoading = false;
        console.log(res);
        if (res.data.code === 700) {
          //到达最后一页
          this.loading = false;
          this.finished = true;
        }
        if (res.data.code === 0) {
          this.loading = false;
          this.items = [...this.items, ...res.data.data.result];
        }
      });
    },
  },
  components: {
    CommonTab,
    HomeHead,
    Recommend,
    backtop
  },
};
</script>

<style lang="scss" scoped>
.Banner {
  background-color: #ffff;
  padding: 10px;
}
.my-swipe {
  border-radius: 10px;
  height: 150px;
  img {
    width: 100%;
    border-radius: 10px;
  }
}
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>