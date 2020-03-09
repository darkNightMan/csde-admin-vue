<template>
  <div class="login-container">
    <form class="login-form">
      <div class="login-title">博客后台登入</div>
      <el-form  :model="loginForm"  ref="loginForm" :rules="loginRule">
        <el-form-item label="" prop="userName"  icon="el-icon-user">
          <el-input  class="el-icon-user-solid"  placeholder="请输入内容"  v-model="loginForm.userName"  clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
       </el-form-item>
       <el-form-item>
          <el-button type="primary"  style="width:100%" @click="submint('loginForm')">登入</el-button>
       </el-form-item>
      </el-form>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        password: '',
        userName: ''
      },
      loginRule: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submint (formName) {
      debugger
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.login-container{
    min-height: 100%;
    width: 100%;
    background-color: #2d3a4b;
    overflow: hidden;
}
.login-form{
  padding: 150px 700px;
}
.login-title{
  font-size: 32px;
  color: #FFf;
  padding: 50px;
}
</style>
