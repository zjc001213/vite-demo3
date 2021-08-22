<template>
  <div class="cart">
    <head-bar>
      <template v-slot:center>
        <div>
          <span>购物车</span>
        </div>
      </template>
    </head-bar>
    <nav-bar></nav-bar>

    <div class="cart-body">
      <van-checkbox-group v-model="result" @change="groupChange">
        <van-swipe-cell>
          <div class="good-item" v-for="item in list" :key="item">
            <van-checkbox
              checked-color="#51c7c7"
              @click="demo"
              :name="item.cartItemId"
            ></van-checkbox>
            <div class="good-img">
              <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>
                  {{ item.goodsName }}
                </span>
                <span style=""> ×{{ item.goodsCount }} </span>
              </div>
              <div class="good-btn">
                <div class="price">
                  <span>${{ item.sellingPrice }}</span>
                </div>
                <van-stepper
                  integer
                  :min="1"
                  :max="5"
                  v-model="item.goodsCount"
                  :name="item.cartItemId"
                  button-size="40"
                  input-width="40"
                />
              </div>
            </div>
          </div>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      button-text="结算"
      button-color="#51c7c7"
      :price="total * 100"
      @submit="onSubmit"
      class="van-hairline--top"
    >
      <van-checkbox checked-color="#51c7c7" v-model="checkAll" @click="allCheck"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import headBar from "../components/headBar.vue";
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import { getCart } from "../service/cart";
import { useStore } from "vuex";
export default {
  name: "cart",
  components: {
    NavBar,
    headBar,
  },
  setup() {
    const state = reactive({
      list: [],
      result: [],
      checked: false,
      checkAll: false,
    });

    const checkboxGroup = ref(null);

    const store = useStore()

    onMounted(() => {
      init();
    });

    const init = async function () {
      const { data } = await getCart({ pageNumber: 1 });
      state.list = data;
      console.log("data", data);
      state.result = data.map((item) => item.cartItemId);
      store.dispatch("updateCart");
    };

    const onSubmit = function () {
      console.log("结算");
    };

    const total = computed(() => {
      let sum = 0;
      let _list = state.list.filter((item) =>
        state.result.includes(item.cartItemId)
      );

      _list.forEach((item) => {
        sum += item.goodsCount * item.sellingPrice;
      });

      return sum;
    });

    const demo = function () {
      console.log("1");
      console.log(state.result);
    };

    const allCheck = function () {
      if (state.checkAll) {
        state.result = state.list.map((item) => item.cartItemId);
      } else {
        state.result = [];
      }
    };

    const groupChange = function (result) {
      if (result.length == state.list.length) {
        state.checkAll = true;
      } else {
        state.checkAll = false;
      }
      state.result = result;
    };

    return {
      ...toRefs(state),
      onSubmit,
      total,
      allCheck,
      checkboxGroup,
      demo,
      groupChange,
    };
  },
};
</script>

<style scoped>
* {
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.good-item {
  display: flex;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}
.good-img > img {
  width: 144px;
  height: 144px;
}
.good-desc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  padding: 28px;
}
.price {
  color: red;
  size: 16px;
  line-height: 28px;
}
.good-title {
  display: flex;
  justify-content: space-between;
}
.good-btn {
  display: flex;
  justify-content: space-between;
}

.cart-body {
  margin: 20px;
  padding-bottom: 200px;
  /* height: 200px; */
  overflow: hidden;
}

.van-submit-bar {
  position: fixed;
  margin-bottom: 60px;
}

.van-checkbox__icon--checked .van-icon {
  background-color: #51c7c7;
  border-color: #51c7c7;

}

</style>