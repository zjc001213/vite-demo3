<template>
  <div class="user">
    <head-bar>
      <template v-slot:right>
        <van-icon name="arrow-left" @click="goBack" />
      </template>
      <template v-slot:center>
        <div><span>我的</span></div>
      </template>
    </head-bar>
    <nav-bar></nav-bar>
    <van-skeleton title row="3" avatar :loading="loading">
      <div class="user-info">
        <div class="info">
          <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" alt="" />
          <div class="user-desc">
            <span>昵称：{{ user.nickName }}</span>
            <span>登录名：{{ user.loginName }}</span>
            <span>个性签名：{{ user.introduceSign }}</span>
          </div>
        </div>
      </div>
    </van-skeleton>
    <ul class="user-list">
      <li class="van-hairline--bottom" @click="goTo('order')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('address',{from: 'mine'})">
        <span>地址管理</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('about')">
        <span>关于我们</span>
        <van-icon name="arrow" />
      </li>
    </ul>
  </div>
</template>

<script>
import headBar from "../components/headBar.vue";
import navBar from "../components/NavBar.vue";
import { onMounted, reactive, toRefs } from "vue";
import { getUserInfo } from "../service/user";
import { useRouter } from "vue-router";
export default {
  name: "user",
  components: {
    headBar,
    navBar,
  },
  setup() {
    const state = reactive({
      loading: true,
      user: {},
    });

    const router = useRouter();

    onMounted(async () => {
      const { data } = await getUserInfo();
      console.log("data", data);
      state.user = data;
      state.loading = false;
    });

    const goBack = function () {
      router.go(-1);
      console.log("goBack");
    };

    const goTo = function (r, query) {
      router.push({ path: r, query: query || {} });
    };

    return {
      ...toRefs(state),
      goBack,
      goTo
    };
  },
};
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}
.user-desc {
  display: flex;
  flex-direction: column;
}
.user-info {
  height: 165px;
  width: 100%;
}
.info {
  display: flex;
  background: linear-gradient(90deg, #1baeae, #51c7c7);
  margin: 20px;
  border-radius: 10px;
  padding: 36px 28px;

  box-shadow: #398f8f 2px 2px 20px;
}
.info > img {
  border-radius: 50%;
  width: 86px;
  height: 86px;
}
.user-desc {
  display: flex;
  text-align: left;
  flex-direction: column;
  color: white;
  font: bold;
}

.van-hairline--bottom {
  list-style-type: none;
  /* border-bottom: 1px solid rgb(236, 236, 236); */

  padding: 10px;
  margin: 20px;

  display: flex;
  justify-content: space-between;

  cursor: pointer;

  /* position: relative; */
  /* left: -10px; */
}
</style>