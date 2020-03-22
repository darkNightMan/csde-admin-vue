<template>
  <div class="login-container">
    <form class="login-form">
      <!-- <div class="login-title">博客后台登入</div> -->
      <el-form  :model="loginForm"  @keyup.enter.native="submint('loginForm')"   ref="loginForm" :rules="loginRule">
        <el-form-item label="" prop="phone"  icon="el-icon-user">
          <el-input  class="el-icon-user-solid"  placeholder="请输入内容"  type="number" v-model.number="loginForm.phone"  clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
       </el-form-item>
       <el-form-item>
          <el-button type="primary"  style="width:100%" @click="submint('loginForm')" :loading="loading">登入</el-button>
       </el-form-item>
      </el-form>
    </form>
  </div>
</template>
<script>
import { api } from '@/request/api.js'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      loginForm: {
        phone: '',
        password: ''
      },
      loginRule: {
        phone: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setToken']),
    submint (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let { data, code } = await this.Req.post(api.login, this.loginForm)
          if (code === 200) {
            this.loading = false
            this.setToken(data.token)
            window.localStorage.setItem('token', data.token)
            this.$router.push('/home')
          } else {
            this.loading = false
          }
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
  width: 400px;
  margin: 300px auto;
}
.login-title{
  font-size: 32px;
  color: #FFf;
  padding: 50px;
}
</style>
