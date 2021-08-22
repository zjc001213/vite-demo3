<template>
  <div class="address">
    <header-bar>
      <template v-slot:right>
        <van-icon name="arrow-left" @click="goBack" />
      </template>
      <template v-slot:center>
        <span class="header-title">地址管理</span>
      </template>
    </header-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    >
    </van-address-list>
  </div>
</template>

<script>
import headerBar from "../components/headBar.vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted, reactive, toRefs } from "vue";
import { getAddressList } from "../service/address";
import { Toast } from "vant";
export default {
  name: "address",
  components: {
    headerBar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      chosenAddressId: "1",
      list: [],
      from: route.query.from,
    });

    onMounted(async function () {
      const { data } = await getAddressList();
      if (!data) {
        state.list = [];
        Toast.fail("地址为空哦~ 亲");
        return;
      }

      state.list = data.map((item) => {
        return {
          id: item.addressId,
          name: item.userName,
          tel: item.userPhone,
          address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
          isDefault: !!item.defaultFlag,
        };
      });
    });

    const goBack = function () {
      router.go(-1);
    };

    const onEdit = function (item) {
      router.push({
        path: "/address-edit",
        query: { type: "edit", addressId: item.id, from: state.from },
      });
    };

    const onAdd = function () {
      router.push({
        path: '/address-edit',
        query: {
          type: 'add',
        }
      })
    };

    return {
      ...toRefs(state),
      goBack,
      onEdit,
      onAdd,
    };
  },
};
</script>

<style scoped>
.header-title {
  font-size: 24px;
}
</style>