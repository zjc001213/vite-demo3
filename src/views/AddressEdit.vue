<template>
  <div class="address-edit">
    <header-bar>
      <template v-slot:right>
        <van-icon name="arrow-left" @click="goBack" />
      </template>
      <template v-slot:center>
        <span class="header-title">编辑地址</span>
      </template>
    </header-bar>

    <van-address-edit
      :address-info="addressInfo"
      @save="onSave"
      @delete="onDelete"
      show-set-default
      :show-delete="'edit' == type"
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :search-result="searchResult"
    >
    </van-address-edit>
  </div>
</template>

<script>
import headerBar from "../components/headBar.vue";
import { onMounted, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  getAddressDetail,
  addAddress,
  editAddress,
  deleteAddress,
} from "../service/address";
import { Toast } from "vant";
import { tdist } from "../common/js/utils";
export default {
  name: "AddressEdit",
  components: {
    headerBar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      addressInfo: {},
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      type: "add",
      from: route.query.from,
      addressId: "",
      searchResult: [],
    });

    onMounted(async function () {
      Toast.loading('loading')

      let _province_list = {};
      let _city_list = {};
      let _county_list = {};

      tdist.getLev1().forEach((p) => {
        _province_list[p.id] = p.text;
        tdist.getLev2(p.id).forEach((c) => {
          _city_list[c.id] = c.text;
          tdist.getLev3(c.id).forEach((q) => {
            _county_list[q.id] = q.text;
          });
        });
      });
      console.log("tdist.getLev2()", tdist.getLev2("130000"));
      state.areaList.province_list = _province_list;
      state.areaList.city_list = _city_list;
      state.areaList.county_list = _county_list;

      //   state.areaList.province_list = ["1", "2", "3", "4"];
      //   state.areaList.city_list = ["1", "2", "3", "4"];
      //   state.areaList.county_list = ["1", "2", "3", "4"];

      const { addressId, type, from } = route.query;
      state.addressId = addressId;
      state.type = type;
      state.from = from || "";

      if (type == "edit") {
        console.log('编辑地址', addressId)
        const { data: addressDetail } = await getAddressDetail(addressId);
        console.log("data", addressDetail);
        let _areaCode = "";
        const province = tdist.getLev1();
        console.log('regionName',addressDetail.regionName)
        console.log('state.areaList.county_list',state.areaList.county_list)
        console.log('state.areaList.county_list',Object.entries(state.areaList.county_list))
        Object.entries(state.areaList.county_list).forEach(([id, text]) => {
          //先找出相应的地区
          if (text == addressDetail.regionName) {
            console.log('对应的地区',text)
            //找到对应的省份
            const provinceIndex = province.findIndex(
              (item) => item.id.substr(0, 2) == id.substr(0, 2)
            );
            //找到对应的市区
            const cityItem = Object.entries(state.areaList.city_list).filter(
              ([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4)
            )[0];
            // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
            if (
              province[provinceIndex].text == addressDetail.provinceName &&
              cityItem[1] == addressDetail.cityName
            ) {
              _areaCode = id;
              console.log('_areaCode', _areaCode)
            }
          }
        });

        state.addressInfo = {
          id: addressDetail.addressId,
          name: addressDetail.userName,
          tel: addressDetail.userPhone,
          province: addressDetail.provinceName,
          city: addressDetail.cityName,
          county: addressDetail.regionName,
          addressDetail: addressDetail.detailAddress,
          areaCode: _areaCode,
          isDefault: !!addressDetail.defaultFlag,
        };
      }
      Toast.clear()
    });

    const goBack = function () {
      router.go(-1);
    };

    const onSave = async function (content) {
      //   Toast.success("save");
      //   console.log(content)
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
      };

      if (state.type == "edit") {
        params["addressId"] = state.addressId;
      }

      await (state.type == "add" ? addAddress(params) : editAddress(params));

      Toast.success("保存成功");
      setTimeout(() => {
        Toast.clear();
        router.back();
      }, 1000);
    };

    const onDelete = async function (content) {
      // Taost.success("delete");
      console.log(content);

      await deleteAddress(content.id);
      Toast.success("删除成功");
      setTimeout(function () {
        Toast.clear();
        router.back();
      }, 1000);
    };

    return {
      ...toRefs(state),
      goBack,
      onSave,
      onDelete,
    };
  },
};
</script>
     
<style scoped>
.header-title {
  font-size: 24px;
}
</style>
