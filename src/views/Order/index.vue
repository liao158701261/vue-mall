<template>
  <div>
    <!--  头部 -->
    <van-nav-bar
      class="order-head"
      title="订单页"
      left-arrow
      @click-left="onClickRight"
    />
    <!-- /头部 -->
    <!-- 默认联系人 -->
    <van-contact-card
      class="order-contact"
      :type="cardType"
      :name="currentContact.linkMan"
      :tel="currentContact.mobile"
      @click="onEdit"
    />
    <!-- /默认联系人 -->
    <div class="order-card">
      <!-- 商品 -->
      <van-card
        v-for="item in items"
        :key="item.id"
        :num="item.number"
        :price="item.price"
        :desc="item.characteristic ? item.characteristic : '暂无描述'"
        :title="item.name"
        :thumb="item.pic"
      />
      <!-- /商品 -->
    </div>
    <!--  提交-->
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" />
    <!-- /提交 -->
  </div>
</template>

<script>
import { orderContact, detailsContact, fetchCartItems } from 'api'
import { getToken } from 'utils'
import { Toast } from 'vant'
export default {
  data () {
    return {
      currentContact: {},
      isShow: false,
      items: [],
      total: 0,
      // 订单联系人
      contact: {}
    }
  },
  created () {
    this.getContact()
    this.fetchCartItems()
  },
  methods: {
    onSubmit () {
      Toast.success('提交成功')
    },
    fetchCartItems () {
      // 获取订单商品
      fetchCartItems({
        token: getToken()
      }).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.total = res.data.data.price * 100
          const array = res.data.data.items
          array.forEach((item) => {
            if (item.selected) {
              this.items.push(item)
            }
          })
        }
      })
    },
    onAdd () {
      Toast('新增')
      this.$router.push('/contactAdd')
    },
    getContact () {
      // 获取订单联系人
      if (this.$route.query.id) {
        detailsContact({
          id: this.$route.query.id,
          token: getToken()
        }).then((res) => {
          console.log('1111', res)
          this.currentContact = res.data.data.info
        })
      } else {
        orderContact({
          token: getToken()
        }).then((res) => {
          console.log('1212', res)
          if (res.data.code === 0) {
            this.currentContact = res.data.data.info
            this.isShow = false
          }
          if (res.data.code === 700) {
            this.isShow = true
          }
        })
      }
    },
    onEdit () {
      this.$router.push('/contactLists')
    },
    onClickRight () {
      this.$router.push('/cart')
    }
  },
  computed: {
    cardType () {
      return this.currentContact.id ? 'edit' : 'add'
    }
  }
}
</script>

<style lang="scss" scoped>
.order-head {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.order-head {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.order-contact {
  width: 100%;
  position: fixed;
  top: 46px;
  left: 0;
  z-index: 100;
}
.order-card {
  margin: 118px 0 50px;
}
</style>
