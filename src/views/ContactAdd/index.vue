<template>
  <div>
    <!--  头部 -->
    <van-nav-bar title="添加联系人" left-arrow @click-left="onClickRight" />
    <!-- /头部 -->
    <div class="wrap">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { addContact }from "api"
import {Toast} from 'vant'
export default {
  data() {
    return {
      areaList,
    };
  },
  components: {},
  methods: {
    onSave(contact) {
      //点击保存按钮
      const obj = {};
      for (const key in contact) {
        switch (key) {
          case "name":
            obj.linkMan = contact[key];
            break;
          case "tel":
            obj.mobile = contact[key];
            break;
          case "city":
            obj.cityId = contact[key];
            break;
          case "addressDetail":
            obj.address = contact[key];
            break;
          case "province":
            obj.provinceId = contact[key];
            break;
          case "isDefault":
            obj.isDefault = contact[key];
            break;
            default:
            break
        }
      }
      console.log(contact);
      addContact({
        ...obj,
        token:localStorage.getItem('token')
      }).then(res=>{
        console.log(res);
        if(res.data.code===0){
          Toast({
            type:'success',
            message:'添加成功',
            onClose:()=>{
              this.$router.go(0)
            }
          })
        }
      })
    },
    onClickRight() {
      this.$router.push('/contactLists')
    },
  },
};
</script>

<style lang="scss" scoped>
</style>