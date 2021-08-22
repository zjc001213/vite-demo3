<template>
  <div class="good">
    
    <div class="good-header">
        <slot></slot>
    </div>
    <div class="good-box">
      <div class="good-item" v-for="(item, index) in goodes" :key="index">
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="none" />
        <div class="good-desc">
          <div class="title">
            {{ item.goodsName }}
          </div>
          <div class="price">
            {{ item.sellingPrice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "good",
  props: {
    goodes: {
      type: Array,
    },
  },
  created() {
    console.log("newGoodses", this.goodes);
  },
};
</script>


<style scoped>
.good {
}
.good-header {
  font-size: 2em;
  color: #1baeae;
  line-height: 2em;

}
.good-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.good-item {
  background: #fff;
  width: 50%;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  padding: 10px;
}
.good-item > img {
  height: 172px;
}
.price {
  color: #1baeae;
}
.price::before{
    content: '￥';
}
</style>