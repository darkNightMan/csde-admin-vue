webpackJsonp([8],{jT7l:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("Xxa5"),r=o.n(n),a=o("exGp"),i=o.n(a),s=o("Dd8w"),l=o.n(s),c=o("2CGT"),u=o("SJI6"),p={data:function(){return{loading:!1,screenHeight:window.innerHeight,loginForm:{phone:"",password:"",code:""},loginRule:{phone:[{required:!0,message:"请输入手机号",trigger:"blur"},{type:"number",message:"",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],code:[{required:!0,message:"请输入验证码",trigger:"blur"}]}}},watch:{screenHeight:function(e){}},mounted:function(){},methods:l()({},Object(u.mapMutations)("user",["setToken"]),{submint:function(e){var t,o=this;this.$refs[e].validate((t=i()(r.a.mark(function e(t){var n,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=11;break}return o.loading=!0,e.next=4,o.Req.post(c.a.login,o.loginForm);case 4:n=e.sent,a=n.data,200===n.code&&a&&(o.loading=!1,o.setToken(a.token),window.localStorage.setItem("token",a.token),o.$router.push("/")),o.loading=!1,e.next=13;break;case 11:return console.log("error submit!!"),e.abrupt("return",!1);case 13:case"end":return e.stop()}},e,o)})),function(e){return t.apply(this,arguments)}))},getCaptcha:function(e){this.$refs.captchoImg.src="/api/getCaptcha?d="+Math.random()}})},d={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login-container"},[o("canvas",{style:{height:e.screenHeight+"px"},attrs:{id:"canvas"}}),e._v(" "),o("form",{staticClass:"login-form"},[o("div",{staticClass:"login-title"},[e._v("CSDE.W 系统后台")]),e._v(" "),o("el-form",{ref:"loginForm",attrs:{model:e.loginForm,rules:e.loginRule},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submint("loginForm")}}},[o("el-form-item",{attrs:{label:"",prop:"phone",icon:"el-icon-user"}},[o("el-input",{attrs:{controls:!1,placeholder:"请输入手机号"},model:{value:e.loginForm.phone,callback:function(t){e.$set(e.loginForm,"phone",e._n(t))},expression:"loginForm.phone"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"",prop:"password"}},[o("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"",prop:"code"}},[o("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入验证码"},model:{value:e.loginForm.code,callback:function(t){e.$set(e.loginForm,"code",t)},expression:"loginForm.code"}}),e._v(" "),o("el-button",{staticStyle:{width:"calc(100% - 180px)",float:"right",padding:"0"},attrs:{loading:e.loading},on:{click:e.getCaptcha}},[o("img",{ref:"captchoImg",attrs:{src:"/api/getCaptcha",alt:"captcha"}})])],1),e._v(" "),o("el-form-item",[o("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",loading:e.loading},on:{click:function(t){return e.submint("loginForm")}}},[e._v("登入")])],1)],1)],1),e._v(" "),o("p",{staticClass:"bottom-copyright"},[e._v("Copyright © 2020 darkNightMan Pro 黔ICP备20005477号 ")])])},staticRenderFns:[]};var g=o("VU/8")(p,d,!1,function(e){o("kQbD")},"data-v-9278e8fe",null);t.default=g.exports},kQbD:function(e,t){}});
//# sourceMappingURL=8.2646d32afbf3afddcbab.js.map