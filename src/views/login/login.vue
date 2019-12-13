<template>
    <div class="login-box">
        <div class="from-box"></div>
        <img class="login-src" src="../../assets/login_banner_ele.png" alt="">
    </div>
</template>

<script>
export default {
    name:"login"
}
</script>

<style lang="less">
.login-box{
    // 开启弹性布局
    display: flex;
    /* //上下居中 */
    align-items: center;
    //左右居中
    justify-content: space-around;
    background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
    height: 100%;
    .from-box{
    width: 478px;
    height: 550px;
    background-color: #F5F5F5;
    }
}


</style>