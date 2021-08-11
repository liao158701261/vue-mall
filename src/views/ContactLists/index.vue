<template>
  <div>
    <!--  头部 -->
    <van-nav-bar title="联系人与地址" left-arrow @click-left="onClickRight" />
    <!-- /头部 -->
    <!-- <van-contact-list
      v-model="chosenContactId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    /> -->
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="choseContact"
    />
  </div>
</template>

<script>
import { getContact } from 'api'
export default {
  data () {
    return {
      chosenAddressId: '1',
      list: []
    }
  },
  created () {
    this.getContact()
  },
  beforeRouteEnter (to, from, next) {
    console.log(from)
    localStorage.setItem('from', from.path)
    next()
  },
  methods: {
    choseContact (contact, index) {
      // 联系人的切换
      console.log('555', contact, index)
      const from = localStorage.getItem('from')
      if (from !== '/my') {
        // 从订单页过来
        this.$router.push({
          path: '/order',
          query: {
            id: contact.id
          }
        })
      }
    },
    onClickRight () {
      const from = localStorage.getItem('from')
      console.log('1213', from)
      if ((from === '/my')) {
        // 从订单页过来
        this.$router.push({
          path: '/my',
          query: {
            // id: contact.id,
          }
        })
      }
      if ((from === '/order')) {
        // 从订单页过来
        this.$router.push({
          path: '/order',
          query: {
            // id: contact.id,
          }
        })
      }
      if ((from === '/contactUpdate')) {
        // 从订单页过来
        this.$router.push({
          path: '/order',
          query: {
            // id: contact.id,
          }
        })
      }
    },
    onAdd () {
      this.$router.push('/contactAdd')
    },
    onEdit (contact) {
      // 进入编辑页
      this.$router.push({
        path: '/contactUpdate',
        query: {
          id: contact.id
        }
      })
    },
    onSelect () {},
    getContact () {
      getContact({
        token: localStorage.getItem('token')
      }).then((res) => {
        if (res.data.code === 0) {
          console.log(res)
          const contacts = res.data.data.result
          const contactArr = []
          contacts.forEach((contact) => {
            // 循环每个联系人 所有Key
            const obj = {}
            for (const key in contact) {
              switch (key) {
                case 'id':
                  obj.id = contact[key]
                  break
                case 'linkMan':
                  obj.name = contact[key]
                  break
                case 'mobile':
                  obj.tel = contact[key]
                  break
                case 'isDefault':
                  obj.isDefault = contact[key]
                  break
                case 'address':
                  obj.address = contact[key]
                  break
                default:
                  break
              }
            }
            contactArr.push(obj)
          })
          console.log(contactArr)
          this.list = contactArr
          // 定义默认选中联系人id
          const contact = this.list.find((contact) => contact.isDefault)
          // 如果有默认联系人 选中 id 就是 默认联系人 id  否则 给第一个
          if (contact) {
            this.chosenAddressId = contact.id
          } else {
            this.chosenAddressId = this.list[0].id
          }
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
