<template>
  <div class="register">
    <div class="register-title">
      <span>用户注册</span>
    </div>
    <div class="icon">
      <div class="icon-title">
        <p>头像</p>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-form class="form-box" ref="form">
        <el-form-item label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.mailbox" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.use"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pass" show-password></el-input>
        </el-form-item>
        <el-form-item label="图形码">
          <el-input v-model="form.name1"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.name2" show-password></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button >取消</el-button>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      input: "",
      form: "",
      name:"",
      mailbox:"",
      use:"",
      pass:""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
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
    }
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
    border: 1px solid #ccc;
    .icon-title {
      display: flex; //弹性布局
      p {
        font-size: 15px;
        margin-top: 39px;
        margin-left: 32px;
        // float: left;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        width: 179px;
        height: 179px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin: 26px 186px 48px 171px;
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
    .el-form-item {
      padding-left: 35px;
      display: flex;
      .el-form-item__content{
        width: 489px;
        // height: 39px;
      }
      .el-form-item__label{
        // text-align: right;
        float: right;
      }
      .el-input__inner {
        width: 489px;
        height: 39px;
      }
    }
  }
}
</style>