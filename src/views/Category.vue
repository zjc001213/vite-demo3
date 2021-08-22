<template>
  <div class="category" ref="big">
    <div class="category-search">
      <head-bar>
        <template v-slot:right>
          <van-icon name="arrow-left" @click="back" />
        </template>
        <template v-slot:center>
          <div class="header-search">
            <i class="fdj"></i>
            <router-link to=""> 全场50起！ </router-link>
          </div>
        </template>
      </head-bar>
      <nav-bar></nav-bar>
    </div>
    <div class="search-wrap">
      <list-scroll class="nav-side-wrapper">
        <ul>
          <li
            v-for="item in category"
            :key="item.categoryId"
            v-text="item.categoryName"
            @click="selectMenu(item.categoryId)"
            :class="{ active: currentIndex == item.categoryId }"
          ></li>
        </ul>
      </list-scroll>
      <div class="search-content">
        <list-scroll>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in category">
                <div v-if="currentIndex == category.categoryId" :key="index">
                  <div
                    class="second"
                    v-for="secondCategory in category.secondLevelCategoryVOS"
                    :key="secondCategory.categoryId"
                  >
                    <p class="category-title">
                      {{ secondCategory.categoryName }}
                    </p>
                    <div
                      class="third"
                      v-for="thirdCategory in secondCategory.thirdLevelCategoryVOS"
                      :key="thirdCategory.categoryId"
                      @click="selectProduct(thirdCategory)"
                    >
                      <img
                        src="https://s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
                        alt="none"
                      />
                      <p>{{ thirdCategory.categoryName }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import HeadBar from "../components/headBar.vue";
import { useRouter } from "vue-router";
import { getCategory } from "../service/good";
import { onMounted, toRefs, reactive, ref } from "vue";
import ListScroll from "../components/ListSroll.vue";
export default {
  name: "category",
  components: {
    NavBar,
    HeadBar,
    ListScroll,
  },
  setup() {
    const state = reactive({
      currentIndex: 15,
      category: [],
    });

    // composition API 获取 refs 的形式
    // const searchWrap = ref(null);

    const router = useRouter();

    onMounted(async () => {
      let $searchWrapHeight = document.documentElement.clientHeight;
      const { data } = await getCategory();
      state.category = data;
      console.log(state.category);
    });

    const back = function () {
      router.go(-1);
    };

    const selectMenu = function (index) {
      state.currentIndex = index;
    };

    const selectProduct = function (product) {
      console.log(product);
      router.push({
        path: "/productList",
        query: { categoryId: product.categoryId },
      });
    };

    return {
      back,
      ...toRefs(state),
      selectMenu,
      selectProduct,
    };
  },
};
</script>

<style scoped>
.category {
  height: 100%;
}
.nbfanhui::before {
  content: "<";
  font-size: 35px;
}
.fdj {
  margin: 0 15px;
}
.fdj::before {
  content: "🔍";
}
.header-search {
  background-color: #f7f7f7;
  border-radius: 50px;
  height: 45px;
  width: 80%;
  margin: 12.5px auto;
  display: flex;
  justify-content: right;
  line-height: 45px;
}
.search-wrap {
  height: 80%;
  width: 100%;
  overflow: hidden;
  display: flex;
}
.nav-side-wrapper {
  overflow: hidden;
  width: 23%;
  background: #f8f8f8;
}
.search-wrap ul {
  display: inline-block;
  width: 100%;
}
.active {
  background: #fff;
  color: #1baeae;
}
.search-wrap li {
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
}
.search-content {
  width: 77%;
}
.category-title {
  width: 100%;
  text-align: left;
  display: block;
  color: #2c3e50;
  font-size: 24px;
  margin: 25px 0;
  padding: 30px 0;
}
.second {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
}
.third {
  width: 33%;
  height: 120px;
}
.third img {
  width: 20%;
}
</style>