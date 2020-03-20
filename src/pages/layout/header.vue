<template>
  <div >
    <div class="logo">
      <!-- <img src="../../assets/logo.jpg"> -->
    </div>
    <div class="avatar-right" v-if="userInfo">
      <el-dropdown @command="handleCommand">
        <span style="color:#fff;margin-right:10px">{{userInfo.nick_name}} </span>
        <el-avatar class="pop-avatar" :src="userInfo.avatar" icon="el-icon-user-solid" style="vertical-align: middle;" />
        <i class="el-icon-setting" ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
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
    handleCommand (command) {
      this[command]()
    },
    async loginOut () {
      let { code } = await this.Req.get(api.loginOut)
      if (code === 200) {
        window.localStorage.setItem('token', '')
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
    background-color:rgb(0, 153, 204);
    color: #fff;
    line-height: 60px;
    /* width: 100%; */
  }
  .avatar-right{
    float: right;
  }
</style>
