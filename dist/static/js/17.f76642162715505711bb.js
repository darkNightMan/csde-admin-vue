webpackJsonp([17],{dnoj:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),l=a.n(n),r=a("exGp"),i=a.n(r),o=a("Dd8w"),s=a.n(o),u=a("2CGT"),c=a("SJI6"),p={computed:s()({},Object(c.mapGetters)("user",["userInfo"]),Object(c.mapGetters)("app",["winH"])),methods:{handleClose:function(){},handleSizeChange:function(e){this.queryParam.pageSize=e,this.init()},handleCurrentChange:function(e){this.queryParam.page=e,this.init()},init:function(){var e=this;return i()(l.a.mark(function t(){var a,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.Req.get(u.a.loginLogs,e.queryParam);case 3:a=t.sent,n=a.data,200===a.code&&(e.tableData=n),e.loading=!1;case 8:case"end":return t.stop()}},t,e)}))()}},data:function(){return{queryParam:{page:1,pageSize:10},loading:!1,tableData:[]}},created:function(){this.init()}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData.list,size:"small",stripe:"",height:e.$tableHeight()+50,border:""}},[a("el-table-column",{attrs:{align:"center",fixed:"",prop:"id",label:"日志编号",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",fixed:"",prop:"user_id",label:"用户ID",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",fixed:"",prop:"user_name",label:"用户名",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"角色名"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.userInfo?t.row.userInfo.sys_roles:[],function(t,n){return a("el-tag",{key:n,staticStyle:{margin:"0 5px"},attrs:{type:"primary",effect:"dark",size:"small"}},[e._v("\n            "+e._s(t.role_name)+"\n          ")])})}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"login_ip",label:"IP地址"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"login_address",label:"地点"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"login_time",label:"登录时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"login_description",label:"登录描述"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"login_agent",label:"登录设备",width:"200"}})],1),e._v(" "),a("div",{staticClass:"page-bottom"},[a("el-pagination",{attrs:{"current-page":e.tableData.currentPage,"page-sizes":[10,20,30,40],"page-size":e.tableData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.tableData.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]},g=a("VU/8")(p,d,!1,null,null,null);t.default=g.exports}});
//# sourceMappingURL=17.f76642162715505711bb.js.map