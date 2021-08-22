<template>
  <div class="product">
    <header-bar>
      <template v-slot:right>
        <div @click="goBack">
          <van-icon name="arrow-left"></van-icon>
        </div>
      </template>
      <template v-slot:center>
        <div>
          <span class="header-size">商品详情</span>
        </div>
      </template>
    </header-bar>

    <van-skeleton row="3" :loading="loading">
      <div class="product-body" v-if="detail">
        <img :src="detail.goodsCarouselList[0]" alt="" />
        <div class="good-desc">
          <div class="title">
            {{ detail.goodsName }}
          </div>
          <div class="express">免邮费 顺丰快递</div>
          <div class="price">
            {{ detail.sellingPrice }}
          </div>
        </div>
        <div class="product-intro">
          <ul>
            <li>概述</li>
            <li>参数</li>
            <li>安装服务</li>
            <li>常见问题</li>
          </ul>
          <div
            class="product-content"
            v-html="detail.goodsDetailContent ? detail.goodsDetailContent : ''"
          ></div>
        </div>
      </div>
      <div v-else>商品不存在哦~ 亲</div>
    </van-skeleton>

    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="count"
        @click="goTo"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        color="#1baeae"
        @click="handleAddCart"
      />
      <van-action-bar-button type="danger" text="立即购买" color="#117979" />
    </van-action-bar>
  </div>
</template>

<script>
import headerBar from "../components/headBar.vue";
import { useRouter, useRoute } from "vue-router";
import { computed, reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { getDetail } from "../service/good";
import { prefix } from "../common/js/utils";
import { addCart } from "../service/cart";
import { Toast } from "vant";

export default {
  name: "product",
  components: {
    headerBar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      loading: true,
      detail: {
        goodsCarouselList: [],
      },
    });

    const goBack = function () {
      router.go(-1);
    };

    const goTo = function () {
      router.push({ path: "/cart" });
    };

    onMounted(async () => {
      const { id } = route.params;
      const { data } = await getDetail(id);
      console.log("data", data);
      if (data != null) {
        data.goodsCarouselList = data.goodsCarouselList.map((item) =>
          prefix(item)
        );
        console.log("data.goodsCarouselList", data.goodsCarouselList);
        store.dispatch("updateCart");
      } else {
        Toast.fail('商品不存在哦 ~ 亲')
      }
      state.detail = data;
      console.log("state.detail ", state.detail);
      state.loading = false;
    });

    const count = computed(() => {
      return store.state.cartCount;
    });

    //处理加入购物车
    const handleAddCart = async function () {
      const obj = await addCart({
        goodsCount: 1,
        goodsId: state.detail.goodsId,
      });
      console.log("resultCode", obj);
      if (obj.resultCode == 200) {
        Toast.success(obj.message);
      } else {
        Toast.fail(obj.message);
      }
      store.dispatch("updateCart");
    };

    return {
      ...toRefs(state),
      goBack,
      count,
      goTo,
      handleAddCart,
    };
  },
};
</script>


<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
.header-size {
  font-size: 24px;
}

.product-body {
  /* padding-bottom: 100px; */
  padding: 0px 20px 100px 20px;
}

.title {
  font-size: 24px;
  text-align: left;
}

.express {
  font-size: 20px;
  color: gray;
  text-align: left;
}

.price {
  font-size: 28px;
  text-align: left;
  color: red;
  font-weight: 200;
}
.price::before {
  content: "￥";
}

.product-intro {
  margin-top: 30px;
}
.product-intro > ul {
}

.product-intro > ul > li {
  float: left;
  width: 24%;
  font-size: 20px;
  border-right: 1px solid black;
}

.product-intro > ul > li:last-child {
  border: none;
}

.product-content img {
  width: 80%;
}
</style>