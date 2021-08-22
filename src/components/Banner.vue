<template>
  <div class="banner">
    <div class="wrapper" @click="wraperClick">
      <!-- <img v-for="(item, index) in imgs" :src="item.carousels" alt="图片未显示" :key="index"> -->
        <img v-for="(item, index) in imgs" :key="index" :src="item.carouselUrl" alt="none" class="banner-img">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {

    }
  },
  methods: {
    wraperClick() {
      console.log('wraperClick')
    },
    downMove(e) {
      console.log(e)
    }
  }
};
</script>

<style scoped>
.banner {
  position: static;
}
.banner-img {
  height: 100%;
  width: 100%;
}
.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;

}
.wrapper-item {
  /* display: inline; */
}

</style>
