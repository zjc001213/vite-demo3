<template>
  <div class="demo">
    <van-checkbox-group v-model="checked" ref="checkboxGroup">
      <van-checkbox name="a" checked-color="red">复选框 a</van-checkbox>
      <van-checkbox name="b">复选框 b</van-checkbox>
      <van-checkbox name="c">复选框 c</van-checkbox>
    </van-checkbox-group>

    <van-button type="primary" @click="checkAll">全选</van-button>
    <van-button type="primary" @click="toggleAll">反选</van-button>


    <div>
        <van-checkbox v-model="d" icon-size="30px" checked-color="red" shape="square">
            asdasd
        </van-checkbox>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const checked = ref([]);
    const checkboxGroup = ref(null);

  console.log('checked',checked,checkboxGroup)
    const checkAll = () => {
      checkboxGroup.value.toggleAll(true);
    };
    const toggleAll = () => {
      checkboxGroup.value.toggleAll();
    };

    const d = false
    return {
      checked,
      checkAll,
      toggleAll,
      d,
      checkboxGroup,
    };
  },
};
</script>

<style scoped>

</style>
