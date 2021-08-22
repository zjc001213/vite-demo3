<template>
  <div class="login">
    <haed-bar>
      <template v-slot:right>
        <div>
          <span>《</span>
        </div>
      </template>
      <template v-slot:center>
        <div>
          <span>{{ type == "login" ? "登录" : "注册" }}</span>
        </div>
      </template>
    </haed-bar>
    <img
      class="logo"
      src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png"
      alt=""
    />

    <div class="login-body login" v-if="type == 'login'">
      <van-form @submit="onSubmint">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
        >
        </van-field>
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
        ></van-field>
        <div>
          <div class="btn-flex">
            <div class="link-register" @click="toggle('register')">
              立即注册
            </div>
            <van-button round block color="#1baeae" native-type="submit"
              >登录</van-button
            >
          </div>
        </div>
      </van-form>
    </div>
    <div v-else class="login-body login">
      <van-form @submit="onSubmint">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
        >
        </van-field>
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
        ></van-field>
        <div>
          <div class="btn-flex">
            <div class="link-register" @click="toggle('login')">已有账号</div>
            <van-button round block color="#1baeae" native-type="submit"
              >注册</van-button
            >
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import haedBar from "../components/headBar.vue";
import { reactive, toRefs } from "vue";
import { login, register } from "../service/user";
import md5 from "js-md5";
import { setLocal } from "../common/js/utils";
export default {
  name: "login",
  components: {
    haedBar,
  },
  setup() {
    const state = reactive({
      type: "login",
      username: "",
      password: "",
      username1: "",
      password1: "",
      imgCode: "",
      verify: "",
    });

    //切换登录 注册两种方式
    function toggle(v) {
      state.type = v;
      console.log(v);
    }

    //提交登录或者注册表单
    const onSubmint = async function (values) {
      // console.log("submit");
      if (state.type == "login") {
        const { data } = await login({
          loginName: values.username,
          passwordMd5: md5(values.password),
        });
        console.log("login response", data);
        setLocal("token", data);

        window.location = "/";
      } else {
        await register({
          loginName: values.username1,
          password: values.password1,
        });
        state.type = "login";
        state.verify = "";
      }
    };

    return {
      ...toRefs(state),
      toggle,
      onSubmint,
    };
  },
};
</script>

<style scoped>
* {
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
.logo {
  width: 170px;
  height: 170px;
  display: block;
  margin: 80px auto 20px;
}
.link-register {
  color: #1989fa;
  margin: 20px 0;
  float: left;
  width: 100px;
}
.login-body {
  margin: 40px;
}
.login > form > div {
  display: flex;
  justify-content: center;
}

.btn-flex {
  width: 100%;
  display: flex;
  /* justify-content: start; */
  flex-direction: column;
}

.van-button {
  text-align: center;
  height: 60px;
}
</style>