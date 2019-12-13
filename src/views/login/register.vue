<template>
  <div class="register">
    <div class="register-title">
      <span>用户注册</span>
    </div>
    <div class="icon">
      <p>头像</p>
      <div class="icon-box"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less">
.register {
  width: 600px;
  height: 100%;
  margin: 0 auto;
  // display: block;
  // text-align: center;
  .register-title {
    width: 100%;
    height: 60px;
    background-color: deepskyblue;
    span {
      font-size: 18px;
      color: #fefefe;
      display: block;
      text-align: center;
      line-height: 60px;
    }
  }
  .icon {
    p {
      font-size: 15px;
      margin-top: 39px;
      margin-left: 34px;
    }
    .icon-box {
      width: 179px;
      height: 179px;
      border: 1px dashed #cecece;
      margin: 26px 186px 48px 236px;
    }
  }
}
</style>