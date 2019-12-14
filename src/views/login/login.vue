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
      <el-form :rules="rules" class="form-box" ref="form" :model="form">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <!-- 行 -->
          <el-row>
            <!-- 列 -->
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captcha"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="verification" @click="changecaptcha" :src="changecaptchaURL" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-checkbox v-model="form.checked">
          我已阅读并同意
          <el-link class="cleckbox-title" type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>
        <!-- 按钮 -->
        <el-form-item>
          <el-button class="btn-txt" @click="submitForm" type="primary">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-src" src="../../assets/login_banner_ele.png" alt />
    <!-- 用户注册弹出框 -->
    
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    // 自定义校验规则的函数
    // 手机号
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        // 判断手机号的格式
        // 正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 手机号的格式
          callback(new Error("老铁，你的手机号写错了噢"));
        }
      }
    };
    return {
      //表单的数据
      form: {
        //手机
        phone: "",
        //密码
        password: "",
        //验证码
        captcha: "",
        //勾选
        checked: false
      },

      rules: {
        //手机号
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        //密码
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change"
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为6到18位",
            trigger: "change"
          }
        ],
        //验证码
        captcha: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "change"
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
            trigger: "change"
          }
        ]
      },
      //验证码地址
      changecaptchaURL: process.env.VUE_APP_BASEURL + "/captcha?type=login"
    };
  },
  methods: {
    //表单验证方法
    submitForm() {
      if (this.form.checked === false) {
        //没勾,提示
        this.$message.warning("老铁,没勾先勾一下呗!");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            //验证成功
            this.$message.success("恭喜你,登录成功啦!");
            //调用接口
            axios({
              url: process.env.VUE_APP_BASEURL + "/login",
              method: "post",
              //设置跨域请求跨域携带cookie
              // withCredentials: true,
              withCredentials: true,
              data: {
                phone: this.form.phone,
                password: this.form.password,
                code: this.form.captcha
              }
            }).then(res => {
              window.console.log(res);
            });
          } else {
            //验证失败
            this.$message.error("很遗憾,内容没有写对哦!");
            return false;
          }
        });
      }
    },
    changecaptcha() {
      // 时间戳
      this.changecaptchaURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
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
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
    }
    .el-button {
      width: 100%;
      margin: 0;
    }
    .btn-txt {
      margin-top: 28px;
      margin-bottom: 26px;
    }
  }
}
</style>