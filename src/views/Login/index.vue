<template>
  <div class="box">
    <p class="title">登录</p>
   <div class="img">
      <van-image 
      round
      width="6rem"
      height="6rem"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
   </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="userInfo.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="userInfo.pwd"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
      <div class="reg">
        <div @click="$router.push('/register')">没有账号？立即注册</div>
      </div>
  </div>
</template>

<script>
import { doLogin } from "api";
import { Toast } from "vant";
// import { Toast } from 'vant'
export default {
  data() {
    return {
      userInfo: {
        username: "",
        pwd: "",
      },
    };
  },
  methods: {
    onSubmit(params) {
      params = {
        ...params,
        deviceId: 9527,
        deviceName: "qiming",
      };
      doLogin(params).then((res) => {
        // console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("token", res.data.data.token);
          Toast.success({
            message: "登录成功",
            duration: 1000,
            onClose: () => {
              //跳转到其他页面
              if (this.$route.query.fron) {
                this.$router.replace(this.$route.query.from);
              } else {
                this.$router.replace("/home");
              }
            },
          });
        } else {
          Toast.fail("登录失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box{
  text-align: center;
}
.title {
  /* border-radius: 15px; */
  size: 1px;
  height: 50px;
  line-height: 50px;
  background-color: #20a0ff;
  color: #fff;
  text-align: center;
}
.img{
  margin: 20px;
}
</style>