<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "listscroll",
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1,
    },
    //点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true
    },
    //是否开启横向滚动条
    scrollX: {
        type: Boolean,
        default: false
    },
    //是否开启纵向滚动条
    scrollY: {
        type: Boolean,
        default: true
    },
    //是否派发滚动事件
    linstenScroll: {
        type: Boolean,
        default: true
    },
    scrollData: {
        type: Array,
        default: []
    },
    //是否派发滚动到底事件，用于下拉加载
    pullup: {
        type: Boolean,
        default: false
    },
    //是否派发滚动开始事件
    beforeScroll: {
        type: Boolean,
        default: false
    },
    //当数据更新后，刷新scroll的延时
    refreshDelay: {
        type: Number,
        default: 10
    }
  },
  data() {
      return {
          bs: {}
      }
  },
  methods: {
      //
      initScroll() {
          this.bs = new BScroll(this.$refs.wrapper, {
              probeType: 3,
              click: true
          })
          this.bs.on('scroll',() => {
              console.log('onscroll')
          })
          this.bs.on('scrollEnd', () => {
              console.log('scrollEnd')
          })
      }
  },
  mounted() {
      this.$nextTick(() => {
          this.initScroll()
      })
  },
  updated() {
      //组件更新时更新this.bs
      this.bs.refresh()
  },
};
</script>

<style scoped>
    .scroll-wrapper {
        width: 100%;
        height: 100%;
    }

</style>