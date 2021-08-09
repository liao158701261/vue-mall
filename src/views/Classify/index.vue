<template>
  <div class="wrap">
    <!-- 头部 -->
    <common-head />
    <!-- 左导航 -->
    <div class="box">
      <div class="box-left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="cate in cates"
            :key="cate.id"
            @click="enterList(cate.id)"
            :title="cate.name"
          />
        </van-sidebar>
      </div>
      <!-- /左导航 -->
      <!-- 右内容区 -->
      <div class="box-right">
        <div class="box-right-top">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item
              class="box-right-l"
              v-for="banner in banners"
              :key="banner.id"
            >
              <img :src="banner.picUrl" alt="" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="box-right-b">
          <div
            class="box-right-but"
            v-for="(item, index) in items"
            @click="clickItem(item.id, index)"
            :key="item.id"
          >
            <img :src="item.pic" alt="" />
            <div class="but-c">
              <h2>{{ item.name }}</h2>
              <h3>￥{{ item.minPrice }}</h3>
            </div>
            <van-icon
              @click.stop="addCart(item.id)"
              class="cart-o"
              name="cart-o"
              color="#ef1f1f"
              size="25px"
            />
          </div>
          <div v-if="isShow">
            <img
              class="img-b"
              src="http://www.365editor.com/images/nodata.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <!-- /右内容区 -->
    <!-- /头部 -->
    <common-tab />
  </div>
</template>

<script>
import CommonHead from "components/CommonHead.vue";
import CommonTab from "components/CommonTab.vue";
import { fetchCates, fetchItems, fetchHomeBanner, addCart } from "api";
import { isLogin, getToken } from "utils";
import { Toast } from "vant";
export default {
  components: { CommonTab, CommonHead },
  name: "classify",
  data() {
    return {
      activeKey: 0,
      cates: [],
      basicInfo: {},
      items: [],
      banners: [],
      isShow: false,
    };
  },
  created() {
    this.fetchCates();
    this.enterList();
    this.fetchHomeBanner();
  },
  methods: {
    clickItem(id, index) {
      //跳转详情页
      this.$router.push({
        path: "/details",
        query: {
          id: id,
          index: index,
        },
      });
    },
    addCart(id) {
      // 加入购物车的动作 需要登录才能访问
      if (!isLogin()) {
        // 没有登录
        Toast.fail({
          message: "请登录",
          duration: 1000,
          onClose: () => {
            // 跳转到登录页
            this.$router.push({
              path: "/login",
              query: {
                from: "/home",
              },
            });
          },
        });
        return false;
      }
      // 登录了 加入购物车
      addCart({
        goodsId: id,
        number: 1,
        token: getToken(),
      }).then((res) => {
        if (res.data.code === 0) {
          Toast.success("加入成功，请前往购买");
          this.$store.commit("cart/set_items", res.data.data.items);
        }
      });
    },
    enterList(id) {
      fetchItems({
        categoryId: id,
      }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          this.items = res.data.data.result;
          this.isShow = false;
        }
        if (res.data.code === 700) {
          this.items = [];
          this.isShow = true;
        }
      });
    },
    fetchCates() {
      fetchCates().then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          this.cates = res.data.data;
        }
      });
    },
    fetchHomeBanner() {
      // 请求轮播数据
      fetchHomeBanner().then((res) => {
        if (res.data.code === 0) {
          this.banners = res.data.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
}
.box-right {
  box-sizing: border-box;
  width: 80%;
  padding-left: 10px;
}
.box-right-but {
  height: 120px;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  .but-c {
    flex: 1;
    h2 {
      margin: 20px 0;
    }
    h3 {
      color: #ef1f1f;
      font-size: 19px;
    }
  }
  img {
    width: 120px;
    height: 100px;
    padding-right: 10px;
    border-radius: 10px;
  }
}
.box-right-b {
  margin-top: 120px;
  height: 560px;
  overflow: auto;
}
.box-right-top {
  height: 30px;
  img {
    width: 100%;
    border-radius: 10px;
  }
}
.box-left {
  width: 20%;
}
.img-b {
  width: 100%;
  margin-top: 100px;
}
.cart-o {
  margin: 10px;
  align-self: flex-end;
}
</style>