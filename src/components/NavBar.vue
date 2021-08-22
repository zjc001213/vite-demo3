<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link to="home" tag="li" class="nav-list-item">
        <i></i>
        <span>首页</span>
      </router-link>
      <router-link to="category" tag="li" class="nav-list-item">
        <i></i>
        <span>分类</span>
      </router-link>
      <router-link to="cart" tag="li" class="nav-list-item">
        <van-icon name="cart-o" :badge="count" color="red"></van-icon>
        <span>购物车</span>
      </router-link>
      <router-link to="user" tag="li" class="nav-list-item">
        <i></i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
 name: 'navbar',
  setup() {
    const store = useStore()

    const count = computed(() => {
      return store.state.cartCount
    })

    return {
      count
    }
  }
};
</script>

<style scoped>
.nav-bar {
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.nav-list {
  display: flex;
}
.nav-list-item {
  width: 25%;
  color: black;
  text-decoration: none;  

  display: flex;
  flex-direction: column;
}
span {
  font-size: 12px;
}
.router-link-exact-active{
    color: #1baeae;
}
</style>