<template>
  <div>
    <!-- 搜索框 -->
    <div class="seek-box">
      <van-search
        v-model="value"
        show-action
        background="#4fc08d"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @blur="loseFocus"
        @focus="gainFocus"
      >
        <!-- <template #left>
        <van-button round type="info">返回</van-button>
      </template> -->
        <template #action>
          <div @click="goto">返回</div>
        </template>
      </van-search>
    </div>
    <!-- /搜索框 -->
    <!-- 搜索记录 -->
    <div class="record" v-show="isFocus">
      <div class="his" v-if="!histories.length">暂无记录</div>
      <div
        class="his"
        v-for="his in histories"
        :key="his"
        @click="clivkHis(his)"
      >
        {{ his }}
      </div>
      <div class="hiss" v-if="histories.length" @click="empty">
        清空历史记录
      </div>
    </div>
    <!-- /搜索记录 -->
    <div class="box">
      <!-- 排序 -->
      <van-dropdown-menu v-show="isSort" class="sort-box">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
      <!-- /排序 -->
      <!-- 搜索出的内容 -->
      <van-card
        @click="clickItem(item.id)"
        v-for="item in items"
        :key="item.id"
        :price="item.minPrice"
        :desc="item.characteristic ? item.characteristic : '暂无描述'"
        :title="item.name"
        :thumb="item.pic"
        span="8"
      />
      <!-- /搜索出的内容 -->
      <div class="img-box" v-if="isimg">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01aa925b890fc3a80120245cd2ccfb.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630668207&t=f5d64018bc37a864aef41c1582cd289b"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchItems } from 'api'
export default {
  data () {
    return {
      value: '',
      items: [],
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '价格升序', value: 'b' },
        { text: '价格降序', value: 'c' }
      ],
      isShow: false,
      isFocus: true,
      isimg: false,
      isSort: false,
      histories: []
    }
  },
  created () {
    this.historied()
  },
  watch: {
    value2 (newVal, oldVal) {
      console.log(newVal)
      this.onSearch(this.value)
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(from)
    localStorage.setItem('from', from.path)
    next()
  },
  methods: {
    clickItem (id) {
      this.$router.push({
        path: '/details',
        query: {
          id: id
        }
      })
    },
    goto () {
      const from = localStorage.getItem('from')
      console.log(from)
      if (from === '/home') {
        this.$router.push('/home')
      } else {
        if (from !== '/home') {
          this.$router.push(from)
        }
      }
    },
    empty () {
      localStorage.setItem('his', [])
      this.historied()
    },
    clivkHis (word) {
      // 点击历史记录
      this.value = word
      this.onSearch()
    },
    historied () {
      this.histories = localStorage.getItem('his')
        ? JSON.parse(localStorage.getItem('his'))
        : []
    },
    gainFocus () {
      this.items = []
      this.isFocus = true
      this.isimg = false
      this.isSort = false
      this.historied()
      this.value = ''
    },
    loseFocus () {
      // 失去焦点触发
      this.isFocus = true
      this.isimg = false
    },
    onSearch (val) {
      // console.log(this.value);
      // 存储搜索记录
      /*
      先取 转换成数组 操作数组 JSON.stringify存回去
      */
      let his = localStorage.getItem('his')
        ? JSON.parse(localStorage.getItem('his'))
        : []
      his.unshift(this.value)
      his = [...new Set(his)]
      if (his.length >= 10) {
        his.length = 10
      }
      // 存回去
      localStorage.setItem('his', JSON.stringify(his))
      // 渲染数据
      fetchItems({
        k: this.value,
        orderBy: this.orderBy
      }).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.items = res.data.data.result
          this.isimg = false
          this.isFocus = false
          this.isSort = true
        }
        if (res.data.code === 700) {
          this.items = []
          this.isimg = true
          this.isFocus = false
        }
      })
    }
  },
  computed: {
    orderBy () {
      let order = ''
      /*
      依赖active和priceUpDown
      */
      switch (this.value2) {
        case 'a':
          order = 'useful'
          break
        case 'b':
          order = 'priceUp'
          break
        case 'c':
          order = 'priceDown'
          break
        default:
          break
      }
      return order
    }
  }
}
</script>

<style lang="scss" scoped>
.img-box {
  width: 100%;
  height: 700px;
  img {
    width: 100%;
    margin-top: 120px;
  }
}
.record {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 40px;
  padding: 18px 0;
  // background-color: #fafafa;
}
.his,
.hiss {
  color: #ccc;
  background: #fafafa;
  margin-top: 5px;
  margin-left: 5px;
  padding: 3px;
  border: 1px solid rgba(243, 166, 166, 0.8);
  border-radius: 5px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.hiss {
  background-color: rgb(238, 30, 30);
  color: #fafafa;
}
.seek-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100%;
}
.box {
  margin-top: 105px;
}
.sort-box {
  position: fixed;
  top: 55px;
  left: 0;
  z-index: 100000;
  width: 100%;
}
</style>
