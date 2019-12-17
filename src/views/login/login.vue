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
              <img class="verification" @click="changecaptcha" :src="changecaptchaURL" alt />
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
          <el-button type="primary" @click="dialogFormVisible = true" class="register-button">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-src" src="../../assets/login_banner_ele.png" alt />
    <!-- 用户注册弹出框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form :model="regForm" :rules="regRules" ref="regForm">
        <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
          <!-- 头像上传 name key 参数名 -->
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="regForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <!-- 图形验证码 -->
              <img @click="changeRegCaptcha" class="register-captcha" :src="regCaptchaUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button
                :disabled="time != 0"
                @click="getMessageCode"
              >{{ time == 0 ? "获取用户验证码" : `还有(${time}s)继续获取` }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import axios from "axios";
import { login, register, sendsms } from "../../api/login.js";
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
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        // 判断手机号的格式
        // 正则
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 手机号的格式
          callback(new Error("老铁，你的邮箱号写错了噢"));
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
      // 注册表单
      regForm: {
        phone: "",
        // 图片验证码
        code: "",
        // 头像
        avatar: "",
        // 邮箱
        email: "",
        // 密码
        password: "",
        // 短信验证
        rcode: ""
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
      regRules: {
        // 手机号
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 密码
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为 6 到 18",
            trigger: "change"
          }
        ],
        // 用户名
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 18,
            message: "名字的长度为2到18",
            trigger: "change"
          }
        ],
        // 验证码
        rcode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
            trigger: "change"
          }
        ],
        // 邮箱
        email: [{ required: true, validator: checkEmail, trigger: "blur" }]
      },
      //验证码地址
      changecaptchaURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 是否显示对话框
      dialogFormVisible: false,
      // 宽度
      formLabelWidth: "65px",
      // 上传地址
      imageUrl: "",
      // 验证码 注册区域 type和上面不同
      regCaptchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      // 倒计时时间
      time: 0,
      // 图片上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/uploads"
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
            // //验证成功
            // this.$message.success("恭喜你,登录成功啦!");
            // //调用接口
            // axios({
            //   url: process.env.VUE_APP_BASEURL + "/login",
            //   method: "post",
            //   //设置跨域请求跨域携带cookie
            //   // withCredentials: true,
            //   withCredentials: true,
            //   data: {
            //     phone: this.form.phone,
            //     password: this.form.password,
            //     code: this.form.captcha
            //   }
            // })
            login({
              phone: this.form.phone,
              password: this.form.password,
              code: this.form.captcha
            }).then(res => {
              // window.console.log(res);
              // return this.$message.success('登录成功!')
              if(res.data.code==202){
                this.$message.error(res.data.message);
              }else if(res.data.code==200){
                this.$message.success("登录成功");
                localStorage.setItem("token",res.data.data.token);
                this.router.push("/index");
              }
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
    },
    // 上传的方法
    handleAvatarSuccess(res, file) {
      // 上传成功之后的 响应内容
      // window.console.log(res);
      // 获取服务器返回的图片地址 不包含 基地址
      window.console.log(res.data.file_path);
      // 保存头像地址
      this.regForm.avatar = res.data.file_path;
      // 生成本地的临时地址
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }, // 重新获取 注册验证码
    changeRegCaptcha() {
      // 时间戳 1970年1月1日 至今的毫秒数
      this.regCaptchaUrl = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&${Date.now()}`;
    },
    // 获取短信验证码
    getMessageCode() {
      if (this.time == 0) {
        // 手机号判断
        // 正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // true 正确 false 错误
        if (!reg.test(this.regForm.phone)) {
          // 提示用户
          return this.$message.error("老弟，你的手机号不太对哦，检查一下呗！");
        }
        // 手机号 图片验证码
        if (this.regForm.code == "" || this.regForm.code.length != 4) {
          return this.$message.error("验证码，不太对哦，你是机器人吗?滑稽");
        }
        // 验证通过 才开始倒计时
        // 可以获取
        this.time = 60;
        // 开启计时器
        const interId = setInterval(() => {
          // 递减
          this.time--;
          // 如果为0
          if (this.time == 0) {
            clearInterval(interId);
          }
        }, 100);

        // 手机号 图片验证码 都ok
        // axios({
        //   url: process.env.VUE_APP_BASEURL + "/sendsms",
        //   method: "post",
        //   // 跨域携带cookie
        //   withCredentials: true,
        //   data: {
        //     phone: this.regForm.phone,
        //     code: this.regForm.code
        //   }
        // })
        sendsms({
          phone: this.regForm.phone,
          code: this.regForm.code
        }).then(res => {
          // window.console.log(res);
          if (res.data.code === 200) {
            this.$message.success("短信验证码是:" + res.data.data.captcha);
          }
        });
      } else {
        // 倒计时还没有结束
      }
    },
    // 表单验证方法 注册
    submitRegForm() {
      // 通过ref获取 注册表单 调用验证方法
      this.$refs.regForm.validate(valid => {
        if (valid) {
          // 验证成功
          // 调用接口
          // axios({
          //   url: process.env.VUE_APP_BASEURL + "/register",
          //   method: "post",
          //   data: {
          //     username: this.regForm.username,
          //     phone: this.regForm.phone,
          //     email: this.regForm.email,
          //     avatar: this.regForm.avatar,
          //     password: this.regForm.password,
          //     rcode: this.regForm.rcode
          //   }
          // })
          register({
            username: this.regForm.username,
            phone: this.regForm.phone,
            email: this.regForm.email,
            avatar: this.regForm.avatar,
            password: this.regForm.password,
            rcode: this.regForm.rcode
          }).then(res => {
            // window.console.log(res)
            if (res.data.code === 200) {
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
            } else {
              this.$message.error("注册失败，请重新注册");
            }
          });
        } else {
          // 验证失败
          this.$message.error("很遗憾，内容没有写对！");

          return false;
        }
      });
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
  // 对话框
  .el-dialog {
    width: 603px;
    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c4fa, #1294fa);
      padding-bottom: 20px;
      .el-dialog__title {
        color: white;
      }
    }
  }
  // 注册验证码
  .register-captcha {
    height: 40px;
    width: 100%;
  }
  // 头像的样式
  // 头像居中
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>