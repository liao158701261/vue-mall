<template>
  <div class="box">
    <van-form @submit="onSubmit">
      <p class="title">注册</p>
      <div class="img">
        <van-image
          round
          width="6rem"
          height="6rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <van-field
        v-model="uerInfo.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="uerInfo.pwd"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
     <div class="reg">
        <div  @click="$router.push('/login')">已注册 去登录</div>
      </div>
  </div>
</template>

<script>
import { register } from "api";
import { Toast } from "vant";
export default {
  data() {
    return {
      uerInfo: {
        username: "",
        pwd: "",
      },
    };
  },
  methods: {
    onSubmit(params) {
      //注册
      register(params).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          //注册成功
          Toast.success({
            message: "注册成功",
            duration: 1000,
            onClose: () => {
              //去登录页
              this.$router.replace("/login");
            },
          });
        } else if (res.data.code === 10000) {
          Toast.success("已注册");
        } else {
          Toast.fail("注册失败");
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