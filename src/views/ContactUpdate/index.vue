<template>
  <div>
    <!--  头部 -->
    <van-nav-bar title="编辑" left-arrow @click-left="onClickRight" />
    <!-- /头部 -->
    <div class="wrap">
      <van-address-edit
        :address-info="addressInfo"
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { amendContact, detailsContact,deleteContact} from "api";
import { Toast } from "vant";
import { getToken } from "utils";
export default {
  data() {
    return {
      areaList,
      addressInfo: {
        //更新联系人默认值
      },
    };
  },
  components: {},
  created() {
    this.detailsContact();
  },
  methods: {
    onDelete(){
      //删除址值
      deleteContact({
        id:this.$route.query.id,
        token:getToken()
      }).then(res=>{
        if(res.data.code===0){
          Toast({
            type: "success",
            message: "删除成功",
            duration:1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      })
    },
    detailsContact() {
      //获取编辑的初始值
      detailsContact({
        id: this.$route.query.id,
        token: getToken(),
      }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          const contact = res.data.data.info;
          let obj = {};
          for (const key in contact) {
            switch (key) {
              case "id":
                obj.id = contact[key];
                break;
              case "linkMan":
                obj.name = contact[key];
                break;
              case "mobile":
                obj.tel = contact[key];
                break;
              case "isDefault":
                obj.isDefault = contact[key];
                break;
              case "address":
                obj.addressDetail = contact[key];
                break;
              case "provinceId":
                obj.province = contact[key];
                break;
              case "cityId":
                obj.city = contact[key];
                break;
              case "provinceId":
                obj.county = contact[key];
                break;
              default:
                break;
            }
          }
          this.addressInfo = obj;
        }
      });
    },
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
        }
      }
      obj.id = this.$route.query.id;
      console.log(contact);
      amendContact({
        ...obj,
        token: localStorage.getItem("token"),
      }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          Toast({
            type: "success",
            message: "修改成功",
            onClose: () => {
              // this.$router.go(-1);
            },
          });
        }
      });
    },
    onClickRight() {
      this.$router.push("/contactLists");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>