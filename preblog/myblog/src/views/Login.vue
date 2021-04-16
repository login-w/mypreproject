<template>
  <div>
    <el-form :rules="rules"
             ref="loginForm"
             :model="loginForm"
             class="logincontainer"
             v-loading="loading"
             element-loading-text="登录中..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <h3 class="loginstyle">用户登录</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code"
                  placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px">

        </el-input>
        <img :src="picture" @click="updatePicture">
      </el-form-item>
      <el-checkbox v-model="checked" class="remember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="loginClick">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      picture: '/captcha?time=' + new Date(),
      loginForm: {
        username: 'admin',
        password: '123',
        code: ""
      },
      loading:false,
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
      }
    }
  },
  methods: {
    updatePicture() {
      this.picture = '/captcha?time' + new Date();
    },
    loginClick() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          /**
           * 后端提供的登录地址
           * url
           */
          this.loading=true;
          this.postRequest('/login', this.loginForm).then(resp => {
            if (resp) {
              this.loading=false;
              //存放后端传来的token
              const tokenStr = resp.tokenHead + resp.token;
              window.sessionStorage.setItem("tokenStr", tokenStr);
              //跳转到首页
              this.$router.replace('/home');
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '登录失败，请检验您输入的数据！',
            type: 'error'
          });
        }
      });
    }
  }
}
</script>

<style>
.el-form-item__content {
  display: flex;
  align-items: center;
}

.logincontainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 10px 30px 10px 30px;
  background: #f4f4f4;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginstyle {
  margin: 5px auto 30px auto;
  text-align: center;
  font-size: 35px;
  color: #00aaff;
}

.remember {
  margin: 0px 0px 20px 0px;
  text-align: left;
}
</style>