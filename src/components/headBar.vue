<template>
    <div class="head-bar">
        <div class="right">
            <slot name="right"></slot>
        </div> 
        <div class="center">
            <slot name="center">center</slot>
        </div>
        <div class="left">
            <slot name="left"></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.head-bar {
    display: flex;
    height: 70px;
    line-height: 70px;
    text-align: center;
}
.right {
    width: 10%;
}
.center {
    width: 80%;
    font-size: 24px;
}
.left {
    width: 10%;
}

</style>