<template>
  <div>
    <common-head />
    <div class="wrap">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="img in pics" :key="img.id">
          <img :src="img.pic" alt="" />
        </van-swipe-item>
      </van-swipe>
      <!-- /轮播图 -->
      <h3>{{ basicInfo.name }}</h3>
      <h1>￥{{ price }}</h1>
      <div class="content" v-html="content"></div>
    </div>
    <!-- 商品规格 -->
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '30%' }"
      round
    >
      <div>
        <van-card
          :num="sku.num"
          :price="sku.minPrice"
          :title="sku.name"
          :thumb="sku.pic"
        >
          <template #footer>
            <van-stepper v-model="sku.num" />
            <van-button @click="addCart" type="danger" size="large"
              >确定</van-button
            >
          </template>
        </van-card>
      </div>
    </van-popup>
    <!-- /商品规格 -->
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-button
        class="button-news"
        plain
        type="primary"
        color="rgb(239, 31, 31)"
        >立即询价</van-button
      >
      <van-button
        class="button-Cart"
        type="danger"
        @click="showSku"
        color="rgb(239, 31, 31)"
        >加入购物车
      </van-button>
    </van-goods-action>
    <!-- /商品导航 -->
  </div>
</template>

<script>
import CommonHead from "components/CommonHead";
import { isLogin, getToken } from 'utils'
import { fetchItemDetail, addCart } from "api";
import { Toast } from "vant";
export default {
  name: "detail",
  data() {
    return {
      basicInfo: {},
      pics: [],
      content: "",
      show: false,
      sku: {
        //商品规格
      },
      price: 0,
      id : ''
    };
  },
  created() {
    this.fetchDetail();
  },
  methods: {
    addCart() {
      //加入购物车的动作 需要登录才能访问
      if (!isLogin()) {
        //没有登录
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
        goodsId: this.id,
        number: this.sku.num,
        token: getToken(),
      }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          Toast.success("加入成功，请前往购买");
          this.$store.commit('cart/set_items', res.data.data.items)
        }
      });
    },
    onClickIcon() {
      Toast("点击图标");
    },
    showSku() {
      //弹出商品规格
      this.show = true;
    },
    fetchDetail() {
      //获取商品详情
      fetchItemDetail(this.$route.query.id).then((res) => {
        if (res.data.code === 0) {
          this.basicInfo = res.data.data.basicInfo;
          this.pics = res.data.data.pics;
          this.sku = {
            ...this.sku,
            ...res.data.data.basicInfo,
          };
          this.content = res.data.data.content.replace(
            /<img/gi,
            '<img style="display:block;width: 100%"'
          );

          this.price = this.sku.minPrice.toFixed(2);
          this.id = this.sku.id
          this.num=this.sku.num
          console.log(this.sku);
        }
      });
    },
  },
  components: {
    CommonHead,
  },
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  width: 100%;
  height: 375px;
}
img {
  width: 100%;
}
h3 {
  font-size: 20px;
  padding: 10px 17px 0;
}
h1 {
  color: rgb(239, 31, 31);
  font-size: 16px;
  padding: 20px 17px 20px;
}
.button-Cart,
.button-news {
  height: 40px;
  width: 140px;
  margin: 0 5px;
  border-radius: 10px;
}
.button-news {
  margin-left: 20px;
}
</style>