<template>
  <div >
    <div class="logo">
      <img  src="../../assets/logo2.jpg"/>
    </div>
    <div class="avatar-right" v-if="userInfo">
      <el-dropdown @command="handleCommand">
        <span style="color:#fff;margin-right:10px; cursor: pointer;">{{userInfo.nick_name}} </span>
        <el-avatar class="pop-avatar" :src="userInfo.avatar" icon="el-icon-user-solid" style="vertical-align: middle;" />
        <i class="el-icon-setting" ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userCenter">个人信息</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出登入</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { api } from '@/request/api.js'

export default {
  name: 'headerTop',
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user', ['setUserInfo']),
    ...mapActions('tabs', ['addView']),
    handleCommand (command) {
      this[command]()
    },
    userCenter () {
      this.addView(
        {
          view: {
            path: 'userCenter',
            component: 'userCenter',
            res_name: '个人信息',
            res_id: -1,
            closeTabs: true, // 默认首页不能关闭
            index: '个人信息'
          }
        }
      )
    },
    async loginOut (a) {
      console.log(api)
      let { code } = await this.Req.get(api.loginOut)
      if (code === 200) {
        window.localStorage.setItem('token', '')
        window.localStorage.setItem('viewAndIndex', '')
        this.setUserInfo({})
        this.$router.push({path: '/login'})
        window.location.reload()
      }
    }
  }
}
</script>

<style>
  .el-header {
    background-color:rgb(45, 140, 240);
    color: #fff;
    line-height: 60px;
    /* width: 100%;rgb(45, 140, 240) rgb(45, 140, 240)*/
  }
  .avatar-right{
    float: right;
  }
  .logo{
    width: 200px;
    height: 40px;
    margin-top: 0px;
    margin-left: 0px;
    float: left;
  }
  .logo img{
    width: 100%;
  }
</style>
