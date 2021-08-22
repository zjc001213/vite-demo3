<template>
  <div class="setting">
    <!-- <p>setting</p> -->
    <head-bar>
      <template v-slot:right>
        <van-icon name="arrow-left" @click="goBack"></van-icon>
      </template>
      <template v-slot:center>
        <div>账号管理</div>
      </template>
    </head-bar>

    <div class="content">
      <div class="input-item">
        <van-field label="昵称" v-model="nickName"></van-field>
        <van-field label="个性签名" v-model="introduceSign"></van-field>
        <van-field label="修改密码" v-model="password"></van-field>
      </div>

      <van-button round size="large" color="#51c7c7">保存</van-button>
      <van-button round size="large" color="#51c7c7" @click="handleLogout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import headBar from "@/components/headBar.vue";
import { useRouter } from "vue-router";
import { getUserInfo, logout } from "../service/user";
import { reactive, toRefs } from "vue";
import {setLocal} from '../common/js/utils'
export default {
  name: "setting",
  components: {
    headBar,
  },

  setup() {
    const state = reactive({
      nickName: "",
      introduceSign: "",
      password: "",
    });

    const router = useRouter();

    const goBack = function () {
      router.go(-1);
    };

    const init = async function () {
      const { data } = await getUserInfo();
      console.log(data);
      state.nickName = data.nickName;
      state.introduceSign = data.introduceSign;
    };

    init();

    const handleLogout = async function() {
        const result = await logout()
        if(result.resultCode == 200) {
            setLocal('token', '')
            window.location= '/'
        }
    }

    return {
      ...toRefs(state),
      goBack,
      handleLogout
    };
  },
};
</script>

<style scoped>
* {
    font-size: 24px;
}
.content {
    margin: 0 20px;
}

.van-button {
    padding: 30px;
    margin: 30px 0;
    width: 80%;
}
</style>