<template>
  <div class="order">
    <header-bar>
      <template v-slot:center>
        <span class="header-title">我的订单</span>
      </template>
      <template v-slot:right> <van-icon name="arrow-left" @click="goBack" /> </template>
    </header-bar>

    <van-tabs :active='active'>
        <van-tab  title="全部"></van-tab>
        <van-tab  title="待付款"></van-tab>
        <van-tab  title="待确认"></van-tab>
        <van-tab  title="代发货"></van-tab>
        <van-tab  title="已发货"></van-tab>
        <van-tab  title="已完成"></van-tab>
    </van-tabs>

    <div class="content">
        <p>content</p>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import headerBar from '../components/headBar.vue'
import {useRouter} from 'vue-router'
import {getOrderList} from '../service/order'
export default {
    name: 'order',
    components: {
        headerBar
    },
    setup() {
        const state = reactive({
            active: 0   
        })
        const router = useRouter()

        onMounted(async function() {
            const data = getOrderList()
        })


        const goBack = function() {
            router.back()
        }


        return {
            ...toRefs(state),
            goBack,
        }
    }
}
</script>

<style scoped>
.header-title {
    font-size: 24px;
}
</style>