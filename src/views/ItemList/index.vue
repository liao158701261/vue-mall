<template>
  <div>
    <!-- 头部 -->
    <list-head />
    <!-- /头部 -->
    <div class="wrap">
      
      <!-- 筛选 -->
      <ul class="list">
        <li @click="switchTab(0)" :class="{ active: active === 0 }">综合</li>
        <li @click="orderByPrice" :class="['price', { active: active === 1 }]">
          <span>价格</span>
          <div
            :class="[
              'angle',
              'up',
              {
                active: active === 1 && priceUpDown === 0,
              },
            ]"
          ></div>
          <div
            :class="[
              'angle',
              'down',
              {
                active: active === 1 && priceUpDown === 1,
              },
            ]"
          ></div>
        </li>
        <li>筛选</li>
      </ul>
      <!-- /筛选 -->
      <van-pull-refresh
        v-model="isLoading"
        :head-height="80"
        @refresh="onRefresh"
      >
        <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
        <template #pulling="props">
          <img
            class="doge"
            src="https://img01.yzcdn.cn/vant/doge.png"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template>

        <!-- 释放提示 -->
        <template #loosing>
          <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
        </template>

        <!-- 加载提示 -->
        <template #loading>
          <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
        </template>
        <!-- items -->
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in items"
            :key="item.id"
            @click="clickItem(item.id, index)"
          >
            <img :src="item.pic" alt="" />
            <div class="item-left">
              <h1>{{ item.name }}</h1>
              <p class="desc">
                {{ item.characteristic ? item.characteristic : "暂无描述" }}
              </p>
              <p class="min-price">￥{{ item.minPrice }}</p>
            </div>
          </div>
          <!-- 数据为空显示 -->
          <div class="data-null" v-if="isShow">
            <img src="http://www.365editor.com/images/nodata.png" alt="" />
          </div>
          <!-- /数据为空显示 -->
        </div>
        <!-- /items -->
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import ListHead from "./components/ListHead.vue";
import { fetchItems } from "api";
export default {
  data() {
    return {
      active: 0,
      items: [],
      priceUpDown: 0, // 0价格升序  1 价格降序
      isShow: false,
      isLoading: false,
    };
  },
  created() {
    this.fetchItems();
    this.onRefresh();
  },
  methods: {
    clickItem(id,index) {
      this.$router.push({
        path: "/details",
        query: {
          id: id,
          index:index
        },
      });
    },
    onRefresh() {
      // 将 上拉到达最后一页状态变成false
      this.finished = false;
      // 下拉刷新触发了
      this.fetchItems();
    },
    fetchItems() {
      fetchItems({
        categoryId: this.$route.params.cateId,
        orderBy: this.orderBy,
      }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          this.items = res.data.data.result;
        }
        if (res.data.code === 700) {
          this.isShow = true;
        }
        this.isLoading = false;
      });
    },
    switchTab(index) {
      // 切换 导航
      this.active = index;
      this.fetchItems();
    },
    orderByPrice() {
      // 按照价格排序
      /*
      1，从按照其他排序切换到价格 此时 要默认按照价格的 升序,
      2，按照价格排序，点击切换升序还是降序
      */
      if (this.active !== 1) {
        this.active = 1;
        this.priceUpDown = 0;
      } else {
        if (this.priceUpDown === 0) {
          this.priceUpDown = 1;
        } else {
          this.priceUpDown = 0;
        }
      }
      this.fetchItems();
    },
  },
  computed: {
    orderBy() {
      let order = "";
      /* 
      依赖active和priceUpDown
      */
      switch (this.active) {
        case 0:
          // 综合
          order = "ordersUp";
          break;
        case 1:
          // 价格 判断升序还是降序
          if (this.priceUpDown === 0) {
            order = "priceUp";
          } else {
            order = "priceDown";
          }
        default:
          break;
      }
      return order;
    },
  },
  components: {
    ListHead,
  },
};
</script>

<style lang="scss" scoped>
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
.list {
  position: sticky;
  top: 56px;
  width: 100%;
  height: 38px;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  z-index: 100;
  li.active {
    color: #ef1f1f;
  }
}
.item {
  width: 100%;
  height: 151px;
  // padding: 10px;
  background-color: rgb(255, 255, 255);
  display: flex;
  // justify-content: space-between;
  align-items: center;
  img {
    margin: 5px;
    height: 121px;
    width: 121px;
    border-radius: 10px;
  }
}
.item-left {
  align-self: flex-start;
  margin-left: 10px;
  h1 {
    margin-top: 15px;
    font-size: 18px;
  }
  position: relative;
}
.min-price {
  color: #ef1f1f;
  position: absolute;
  bottom: -77px;
  left: 0px;
}
.desc {
  font-size: 14px;
  color: #ccc;
  margin-top: 10px;
}
.data-null {
  margin: 150px 0;
  img {
    width: 100%;
  }
}
.price {
  position: relative;
  .angle {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    position: absolute;
    right: -15px;
    &.up {
      border-bottom-color: #ccc;
      top: 6px;
      &.active {
        border-bottom-color: #ef1f1f;
      }
    }
    &.down {
      border-top-color: #ccc;
      bottom: 3px;
      &.active {
        border-top-color: #ef1f1f;
      }
    }
  }
}
</style>