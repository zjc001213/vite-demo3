<template>
  <div class="product-list">
    <head-bar>
      <template v-slot:right>
        <div @click="back">
          <i class="fanhui"></i>
        </div>
      </template>
      <template v-slot:center>
        <div class="header-search">
          <i class="fdj"></i>
          <input type="text" class="search-title" />
        </div>
      </template>
      <template v-slot:left>
        <span class="search-btn">搜索</span>
      </template>
    </head-bar>
    <div class="container">
      <div class="tab-wrapper"></div>
    </div>
  </div>
</template>
<script setup>
import headBar from "../components/headBar.vue";
import { useRouter } from "vue-router";
import { search } from "../service/good";
import {reactive, toRefs, ref} from 'vue'
const router = useRouter();

const state = reactive({
    
})

const back = function () {
  router.go(-1);
};

</script>

<style scoped>
.fanhui::before {
  content: "<";
  font-size: 30px;
}
.fdj::before {
  content: "🔍";
  font-size: 24px;
  margin: 0 20px;
}
.header-search {
  display: flex;
  background: #f7f7f7;
  border-radius: 20px;
  height: 45px;
  line-height: 45px;
  margin: 15px 0;
}
.search-title {
  border: none;
  outline: none;
  height: 30px;
  background: rgba(0, 0, 0, 0);
  margin: 7.5px 10px;
}
.search-btn {
  height: 40px;
  width: 57px;
  background: #1baeae;
  border-radius: 10px;
  display: inline-block;
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  line-height: 40px;
}
</style>