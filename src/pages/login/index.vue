<template>
  <div class="login-container">
    <canvas id="canvas" :style="{ height:screenHeight + 'px'}"></canvas>
    <form class="login-form">
      <div class="login-title">CSDE.W 系统后台</div>
      <el-form :model="loginForm" @keyup.enter.native="submint('loginForm')"   ref="loginForm" :rules="loginRule">
        <el-form-item label="" prop="phone" icon="el-icon-user">
          <el-input :controls="false"   placeholder="请输入手机号" v-model.number="loginForm.phone" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <el-input style="width:150px;" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button  style="width:calc(100% - 180px);float:right;padding:0" :loading="loading" @click="getCaptcha">
            <img ref="captchoImg" src="/api/getCaptcha" alt="captcha" >
          </el-button>
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
      screenHeight: window.innerHeight, // 屏幕高度
      loginForm: {
        phone: '',
        password: '',
        code: ''
      },
      loginRule: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
          // {pattern:/^1[0-9]{10}$/,message: '请输入正确的手机号码', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'screenHeight': function (val) { // 监听屏幕高度变化
      // var oIframe = document.getElementById('login')
      // oIframe.style.height = Number(val) + 'px' // '120'是页面布局调整，可去除
    }
  },
  mounted () {
    // var _this = this
    // window.onresize = function () { // 定义窗口大小变更通知事件
    //   _this.screenHeight = document.documentElement.clientHeight // 窗口高度
    // }
    // var canvas = document.getElementById('canvas')
    // var ctx = canvas.getContext('2d')
    // var w = canvas.width = window.innerWidth
    // var h = canvas.height = window.innerHeight
    // var hue = 217
    // var stars = []
    // var count = 0
    // var maxStars = 1300 // 星星数量

    // var canvas2 = document.createElement('canvas')
    // var ctx2 = canvas2.getContext('2d')
    // canvas2.width = 100
    // canvas2.height = 100
    // var half = canvas2.width / 2
    // var gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
    // gradient2.addColorStop(0.025, '#CCC')
    // gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
    // gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
    // gradient2.addColorStop(1, 'transparent')

    // ctx2.fillStyle = gradient2
    // ctx2.beginPath()
    // ctx2.arc(half, half, half, 0, Math.PI * 2)
    // ctx2.fill()

    // // End cache

    // function random (min, max) {
    //   if (arguments.length < 2) {
    //     max = min
    //     min = 0
    //   }

    //   if (min > max) {
    //     var hold = max
    //     max = min
    //     min = hold
    //   }

    //   return Math.floor(Math.random() * (max - min + 1)) + min
    // }

    // function maxOrbit (x, y) {
    //   var max = Math.max(x, y)
    //   var diameter = Math.round(Math.sqrt(max * max + max * max))
    //   return diameter / 2
    //   // 星星移动范围，值越大范围越小，
    // }

    // var Star = function () {
    //   this.orbitRadius = random(maxOrbit(w, h))
    //   this.radius = random(60, this.orbitRadius) / 8
    //   // 星星大小
    //   this.orbitX = w / 2
    //   this.orbitY = h / 2
    //   this.timePassed = random(0, maxStars)
    //   this.speed = random(this.orbitRadius) / 50000
    //   // 星星移动速度
    //   this.alpha = random(2, 10) / 10

    //   count++
    //   stars[count] = this
    // }

    // Star.prototype.draw = function () {
    //   var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
    //   var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
    //   var twinkle = random(10)

    //   if (twinkle === 1 && this.alpha > 0) {
    //     this.alpha -= 0.05
    //   } else if (twinkle === 2 && this.alpha < 1) {
    //     this.alpha += 0.05
    //   }

    //   ctx.globalAlpha = this.alpha
    //   ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
    //   this.timePassed += this.speed
    // }

    // for (var i = 0; i < maxStars; i++) {
    //   /* eslint-disable no-new */
    //   new Star()
    // }

    // function animation () {
    //   ctx.globalCompositeOperation = 'source-over'
    //   ctx.globalAlpha = 0.5 // 尾巴
    //   ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
    //   ctx.fillRect(0, 0, w, h)

    //   ctx.globalCompositeOperation = 'lighter'
    //   for (var i = 1, l = stars.length; i < l; i++) {
    //     stars[i].draw()
    //   };

    //   window.requestAnimationFrame(animation)
    // }

    // animation()

  },
  methods: {
    ...mapMutations('user', ['setToken']),
    submint (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let { data, code } = await this.Req.post(api.login, this.loginForm)
          if (code === 200 && data) {
            this.loading = false
            this.setToken(data.token)
            window.localStorage.setItem('token', data.token)
            this.$router.push('/')
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCaptcha (e) {
      this.$refs.captchoImg.src = '/api/getCaptcha?d=' + Math.random()
    }
  }
}
</script>

<style>
.login-container{
    min-height: 100%;
    width: 100%;
    /* background-color: #2d3a4b; */
    overflow: hidden;
}
.login-form{
  max-width: 350px;
  margin: 10% auto;
  padding: 20px;
  /* border: 1px solid rgb(206, 203, 203) */
  /* margin: 300px auto; */

}
.login-title{
  font-size: 28px;
  color: #666;
  padding: 30px;
  text-align: center
}
canvas {
  width: 100%;
  height: auto /*默认全屏显示 可自己设置高度640px*/;
  display: inline-block;
  vertical-align: baseline;
  position: absolute;
  top:0px;
  z-index: 0;
  opacity: 0.2;
}
.canvaszz {
  width: 100%;
  height: 640px;
  position: absolute;
  z-index: 10;
  filter: alpha(opacity=40);
  -moz-opacity: 0.4;
  -khtml-opacity: 0.4;
  opacity: 0.4;
}
</style>
