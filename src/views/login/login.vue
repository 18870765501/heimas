<template>
  <div class="login-box">
    <!-- 表单容器 -->
    <div class="from-box">
      <div class="title-box">
        <img src="../../assets/logon.png" alt />
        <span class="titlt">黑马面面</span>
        <p></p>
        <span class="title-login">用户登录</span>
      </div>
      <!-- 搜索框 -->
      <el-form class="form-box" ref="form" :model="form">
        <el-form-item>
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.name1"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="form.name2" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 行 -->
          <el-row>
            <!-- 列 -->
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.name3"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="verification" src="../../assets/verification.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-checkbox-group class="checkbox" v-model="form.type">
          <el-checkbox class="cleckbox-txt" name="type">
            我已阅读并同意
            <el-link class="cleckbox-title" type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-checkbox-group>
        <!-- 按钮 -->
        <el-form-item>
          <el-button class="btn-txt" type="primary">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-src" src="../../assets/login_banner_ele.png" alt />
  </div>
  
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        name1: "",//手机
        name2: "",//密码
        name3: "",//验证码
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    }
  }
};
</script>
<style lang="less">
.login-box {
  //开启弹性布局
  display: flex;
  //上下居中
  align-items: center;
  //左右居中
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  .from-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 44px;
    .title-box {
      display: flex;
      align-items: center;
      margin-left: 4px;
      margin-bottom: 29px;
      img {
        width: 22px;
        height: 17px;
      }
      .titlt {
        margin-left: 20px;
        font-size: 24px;
        margin-right: 12px;
      }
      p {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 12px;
      }
      .title-login {
        font-size: 22px;
      }
    }
    //表单元素
    .form-box {
      // 验证码
      .verification {
        height: 40px;
        width: 100%;
      }
      .el-checkbox{
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
     
    }
    .el-button{
        width: 100%;
        margin: 0;
      }
    .btn-txt{
      margin-top: 28px;
      margin-bottom: 26px;
    }
  }
}
</style>