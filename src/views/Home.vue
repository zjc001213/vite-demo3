<template>
  <div class="home">
    <!-- <input type="text" v-model="state.msg" /> -->
    <!-- <h1>home</h1> -->
    <header class="home-header" :class="{ active: headerScroll }">
      <router-link tag="i" to="category" class="header-category"
        >分类</router-link
      >
      <div class="header-search">
        <span class="app-name">新峰商城</span>
        <i class="i-mod"></i>
        <router-link tag="sapn" to="" class="search-title"
          >搜索你想要的</router-link
        >
      </div>
      <router-link tag="i" to="user" class="header-user">用户</router-link>
    </header>
    <nav-bar></nav-bar>
    <div class="banner">
      <banner :imgs="carousels" />
    </div>
    <!-- <button @click="show">btn</button> -->
    <div class="category-list">
      <div
        v-for="(item, index) in categoryList"
        :key="index"
        class="category-item"
      >
        <img :src="item.imgUrl" alt="none" />
        <span>{{ item.name }}</span>
      </div>
    </div>

    <div class="good">
      <div class="good-header"><span>新品上线</span></div>
      <van-skeleton :row="3" title :loading="loading">
        <div class="good-box">
          <div
            class="good-item"
            v-for="item in newGoodses"
            :key="item"
            @click="goToDetail(item.goodsId)"
          >
            <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
            <div class="good-desc">
              <div class="title">{{ item.goodsName }}</div>
              <div class="price">{{ item.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>

    <div class="good">
      <div class="good-header"><span>热门商品</span></div>
      <van-skeleton :row="3" title :loading="loading">
        <div class="good-box">
          <div
            class="good-item"
            v-for="item in hotGoodses"
            :key="item"
            @click="goToDetail(item.goodsId)"
          >
            <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
            <div class="good-desc">
              <div class="title">{{ item.goodsName }}</div>
              <div class="price">{{ item.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>

    <div class="good">
      <div class="good-header"><span>最新推荐</span></div>
      <van-skeleton :row="3" title :loading="loading">
        <div class="good-box">
          <div
            class="good-item"
            v-for="item in recommendGoodses"
            :key="item"
            @click="goToDetail(item.goodsId)"
          >
            <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
            <div class="good-desc">
              <div class="title">{{ item.goodsName }}</div>
              <div class="price">{{ item.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref, nextTick } from "vue";
import navBar from "../components/NavBar.vue";
import Banner from "../components/Banner.vue";
import Good from "../components/Good.vue";

import { getHome } from "../service/home";
import { useRouter } from "vue-router";
import { Toast } from 'vant';
export default {
  name: "home",
  components: {
    navBar,
    Banner,
    Good,
  },
  created() {},
  setup() {
    const state = reactive({
      loading: true,
      carousels: [],
      headerScroll: false, //滚动透明度判断
      newGoodses: [],
      hotGoodses: [],
      recommendGoodses: [],
      categoryList: [
        {
          name: "新蜂超市",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png",
          categoryId: 100001,
        },
        {
          name: "新蜂服饰",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png",
          categoryId: 100003,
        },
        {
          name: "全球购",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png",
          categoryId: 100002,
        },
        {
          name: "新蜂生鲜",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png",
          categoryId: 100004,
        },
        {
          name: "新蜂到家",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png",
          categoryId: 100005,
        },
        {
          name: "充值缴费",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png",
          categoryId: 100006,
        },
        {
          name: "9.9元拼",
          imgUrl: "https://s.yezgea02.com/1604041127880/9.9%402x.png",
          categoryId: 100007,
        },
        {
          name: "领劵",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png",
          categoryId: 100008,
        },
        {
          name: "省钱",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png",
          categoryId: 100009,
        },
        {
          name: "全部",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png",
          categoryId: 100010,
        },
      ],
    });
    const router = useRouter();

    onMounted(async () => {
      const toast1 = Toast.loading('loading')
      const { data } = await getHome();
      // console.log('data', data)
      state.carousels = data.carousels;
      state.hotGoodses = data.hotGoodses;
      state.newGoodses = data.newGoodses;
      state.recommendGoodses = data.recommendGoodses;
      state.loading = false;

      console.log("hotGoodses", state.hotGoodses);

      //滚动条监听
      nextTick(() => {
        console.log("执行nexttick");
        window.addEventListener("scroll", () => {
          let scrollTop =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
          // console.log('scrollTop', scrollTop)
          scrollTop > 100
            ? (state.headerScroll = true)
            : (state.headerScroll = false);
        });
      });

      toast1.clear()
    });

    //去详情页
    const goToDetail = function (id) {
      router.push({path: `/product/${id}`});
    };
    return {
      ...toRefs(state),
      goToDetail,
    };
  },
  methods: {
    show() {
      console.log(this.state);
    },
  },
};
</script>

<style scoped>
.home {
  background-color: #f9f9f9;
  width: 100%;
  overflow: hidden;
  /* overflow-x: scroll; */
  padding-bottom: 70px;
}
.active {
  background: #1baeae;
}
.home-header {
  /* opacity: .3; */
  position: fixed;
  height: 70px;

  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  /* background: orange; */
  z-index: 9;
}
.header-search {
  display: flex;
  width: 70%;
  background: rgba(255, 255, 255, 0.3);
  /* opacity: .3; */
  border-radius: 50px;
  margin: 10px auto;
  /* padding: 5px 0; */
  height: 45px;
  line-height: 45px;
}
.header-user {
  margin: 20px;
}
.header-category {
  margin: 20px;
}
.app-name {
  color: #1baeae;
  font-size: 25px;
  font-weight: bold;
  padding: 0 10px;
  margin: 0 10px;
}
.i-mod {
  border-left: black 1px solid;
  height: 25px;
  display: inline-block;
  margin: 10px;
}
.search-title {
  font-size: 16px;
  color: #666;
  text-decoration: none;
}
.banner {
  position: relative;
  z-index: 0;
}
.category-list {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  /* margin: 10px; */
  margin: 10px 0;
}
.category-list .category-item {
  display: inline-block;
  width: 20%;
}
.category-list .category-item > img {
  width: 50px;
  margin: 0 auto;
  padding: 13px;
}
.category-list .category-item > span {
  display: block;
  font-size: 12px;
  color: #2c3e50;
}
.good {
  overflow-y: hidden;
}
.good-box {
  display: flex;
  flex-wrap: wrap;
  background: white;
}

.good-item {
  border: 1PX solid #e9e9e9;
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
}

.good-item > img {
  width: 35%;
}
.good-header > span {
  font-size: 30px;
  color: #1baeae;
}

.good-header {
  margin: 10px 0;
}
.good-desc > .title {
  font-size: 20px;
}

.good-desc > .price {
  color: #1baeae;
}

.good-desc > .price::before {
  content: "$ ";
  font-size: 18px;
}
</style>