<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar :title="titles" class="Cart-head">
      <template #right>
        <div @click="isShow = !isShow">{{ isShow ? "编辑" : "取消" }}</div>
      </template>
    </van-nav-bar>
    <!-- /头部 -->
    <div class="wrap">
      <!-- 内容 -->
      <van-swipe-cell v-for="(item, index) in items" :key="item.id">
        <div class="item">
          <van-checkbox
            v-show="!isShow"
            @click="switchCheck(index)"
            v-model="item.selected"
          />
          <van-card
            :num="item.number"
            :price="item.price"
            :title="item.name"
            class="goods-card"
            :thumb="item.pic"
          >
            <template #footer>
              <van-stepper @change="changeNum(index)" v-model="item.number" />
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button
            @click="delItem(item.key)"
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
      <!-- /内容 -->
      <!-- 去登录 -->
      <div class="goLoing" v-if="show">
        <img src="../../assets/img/222.png" alt="" />
        <van-button
          class="loing-btn"
          type="default"
          @click="$router.replace('/login')"
          >去登录</van-button
        >
      </div>
      <!-- 去登录 -->
      <!-- 数据为空 -->
      <div class="cart-null" v-if="shownull">
        <img src="http://www.365editor.com/images/nodata.png" alt="" />
      </div>
      <!-- 数据为空 -->
      <!-- 订单提交 -->
      <van-submit-bar
        :price="total * 100"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="allChecked">全选</van-checkbox>
      </van-submit-bar>
      <!-- /订单提交 -->
    </div>
    <!-- tabbar -->
    <common-tab />
    <!-- tabbar -->
  </div>
</template>

<script>
import { fetchCartItems, setBuyNumber, switchCheck, delCartItem } from 'api'
import { getToken, isLogin } from 'utils'
import { Dialog } from 'vant'
import CommonTab from 'components/CommonTab'
export default {
  name: 'cart',
  data () {
    return {
      items: [],
      total: 0,
      titleNum: 0,
      titles: '',
      isShow: true,
      show: false,
      shownull: false
    }
  },
  created () {
    this.fetchCartItems()
    console.log(this.$route)
    // if()
  },
  mounted () {
    this.alter()
    this.isToken()
  },
  updated () {
    this.alter()
  },
  watch: {
    items () {
      // 监听购物车数据 将数据 存储到vuex中
      this.$store.commit('cart/set_items', this.items)
    }
  },
  methods: {
    isToken () {
      if (!isLogin()) {
        this.show = true
      }
    },
    alter () {
      if (!this.$store.state.cart.items.length) {
        this.titles = '购物车'
      } else {
        this.titles = `购物车（${this.$store.state.cart.items.length}）`
      }
    },
    delItem (key) {
      // 给确认框删除
      Dialog.confirm({
        title: '删除商品',
        message: '您确认删除吗'
      }).then(() => {
        // on confirm
        delCartItem({
          key,
          token: getToken()
        }).then((res) => {
          if (res.data.code === 0) {
            this.items = res.data.data.items
            this.total = res.data.data.price
          }
          if (res.data.code === 700) {
            // 全部删除
            this.items = []
            this.total = 0
            this.shownull = true
          }
        })
      })
    },
    onSubmit () {
      this.$router.push('/order')
    },
    switchCheck (index) {
      // 修改商品选中状态
      console.log(1111)
      const { key, selected } = this.items[index]
      switchCheck({
        key,
        selected,
        token: getToken()
      }).then((res) => {
        if (res.data.code === 0) {
          this.items = res.data.data.items
          this.total = res.data.data.price
        }
      })
    },
    changeNum (index) {
      // 修改商品购买数量
      const { key, number } = this.items[index]
      setBuyNumber({
        key,
        number,
        token: getToken()
      }).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.items = res.data.data.items
          this.total = res.data.data.price
        }
      })
    },
    title () {
      this.titles = '购物车' + '(' + this.titleNum + ')'
    },
    fetchCartItems () {
      fetchCartItems({
        token: getToken()
      }).then((res) => {
        if (res.data.code === 0) {
          console.log(res)
          this.items = res.data.data.items
          this.total = res.data.data.price
          this.titleNum = res.data.data.goodsStatus.length
        }
        if (res.data.code === 700) {
          // 全部删除
          this.items = []
          this.total = 0
          this.shownull = true
        }
      })
    }
  },
  components: { CommonTab },
  computed: {
    allChecked: {
      get () {
        return this.items.length === 0
          ? false
          : this.items.every((item) => item.selected)
      },
      set (val) {
        // 改变全选修改单选状态
        // 改变单选状态
        // 找到所有商品的key
        const keys = []
        this.items.forEach((item) => {
          keys.push(item.key)
        })
        switchCheck({
          key: keys.join(','),
          selected: val,
          token: getToken()
        }).then((res) => {
          if (res.data.code === 0) {
            this.items = res.data.data.items
            this.total = res.data.data.price
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-null {
  img {
    width: 100%;
    margin: 100px 0 0 0;
  }
}
.Cart-head {
  width: 100%;
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
}
.goLoing {
  img {
    width: 100%;
  }
  .loing-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-30px);
    width: 130px;
    border-radius: 10px;
  }
}
.goods-card {
  margin: 0;
  background-color: white;
}
.delete-button {
  height: 100%;
}
.van-submit-bar {
  bottom: 50px;
}
.item {
  display: flex;
  padding: 10px;
  background-color: #fff;
  .van-card {
    flex: 1;
  }
}
</style>
