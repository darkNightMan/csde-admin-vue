webpackJsonp([15],{mn45:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Xxa5"),o=r.n(a),i=r("exGp"),s=r.n(i),n=r("2CGT"),l={methods:{handleClose:function(){},init:function(){var e=this;return s()(o.a.mark(function t(){var r,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.Req.get(n.a.getAllRole);case 3:r=t.sent,a=r.data,200===r.code&&(e.tableData=a.roleList),e.loading=!1;case 8:case"end":return t.stop()}},t,e)}))()},changeRoleName:function(e){var t=this;this.dialogVisiblerole=!0,this.$nextTick(function(){t.roleValidateForm=e})},checksEdit:function(e,t){var r=this;this.dialogVisible=!0,this.roleid=e.role_id,this.getRoleTreePer(this.roleid),this.treeMenu(function(){!function e(t,r){t.map(function(t){t.disabled=r,t.children&&e(t.children,r)})}(r.dataTree,t)})},treeMenu:function(e){var t=this;return s()(o.a.mark(function r(){var a,i;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.Req.get(n.a.sysMenutree);case 2:a=r.sent,i=a.data,200===a.code&&(t.dataTree=i,e());case 6:case"end":return r.stop()}},r,t)}))()},getRoleTreePer:function(e){var t=this;return s()(o.a.mark(function r(){var a,i;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.Req.get(n.a.getRoleTreePer,{role_id:e});case 2:a=r.sent,i=a.data,200===a.code&&t.$refs.tree.setCheckedKeys(i.res_id);case 6:case"end":return r.stop()}},r,t)}))()},submit:function(){var e=this;return s()(o.a.mark(function t(){var r,a,i,s;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.$refs.tree.getCheckedKeys(),t.next=3,e.Req.post(n.a.setRoleTreePer,{res_idArr:r,role_id:e.roleid});case 3:a=t.sent,i=a.code,s=a.msg,200===i?(e.$message({message:s,type:"success"}),e.dialogVisible=!1):(e.dialogVisible=!1,e.$message({message:s,type:"success"}));case 7:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.isRoleCheck?t.updateRole():t.createRole()})},createRole:function(){var e=this;return s()(o.a.mark(function t(){var r,a,i;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.Req.post(n.a.createRole,{role_name:e.roleValidateForm.role_name,role_code:e.roleValidateForm.role_code});case 2:r=t.sent,a=r.code,i=r.msg,200===a?(e.init(),e.$message({message:i,type:"success"}),e.dialogVisiblerole=!1):(e.dialogVisiblerole=!1,e.$message({message:i,type:"success"}));case 6:case"end":return t.stop()}},t,e)}))()},updateRole:function(){var e=this;return s()(o.a.mark(function t(){var r,a,i;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.Req.put(n.a.updateRole,{role_id:e.roleValidateForm.role_id,role_name:e.roleValidateForm.role_name,role_code:e.roleValidateForm.role_code});case 2:r=t.sent,a=r.code,i=r.msg,200===a?(e.init(),e.$message({message:i,type:"success"}),e.dialogVisiblerole=!1):(e.dialogVisiblerole=!1,e.$message({message:i,type:"success"}));case 6:case"end":return t.stop()}},t,e)}))()},deleteRole:function(e){var t=this;return s()(o.a.mark(function r(){return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:t.$confirm("此操作将永久删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(s()(o.a.mark(function r(){var a,i,s,l;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return a={role_id:e.role_id},r.next=3,t.Req.delete(n.a.deleteRole,{data:a});case 3:i=r.sent,s=i.code,l=i.msg,200===s&&(t.init(),t.$message({type:"success",message:l}));case 7:case"end":return r.stop()}},r,t)}))).catch(function(){t.$message({type:"info",message:"已取消删除"})});case 1:case"end":return r.stop()}},r,t)}))()},createDialog:function(){this.dialogVisiblerole=!0,this.isRoleCheck=!1,this.resetForm("roleValidateForm")},resetForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].resetFields()})}},data:function(){return{dialogVisible:!1,dialogVisiblerole:!1,isRoleCheck:!1,tableData:[],dataTree:[],resIdarr:[],roleid:"",loading:!1,defaultProps:{children:"children",label:"res_name"},roleValidateForm:{role_name:"",role_code:"",role_id:""}}},created:function(){this.init()}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-dialog",{attrs:{title:"菜单权限",visible:e.dialogVisible,"append-to-body":"","close-on-click-modal":!1,width:"20%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-tree",{ref:"tree",attrs:{data:e.dataTree,"show-checkbox":"","expand-on-click-node":!0,"default-expand-all":"",accordion:"","highlight-current":"","check-strictly":"","node-key":"res_id",props:e.defaultProps}}),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:e.isRoleCheck?"编辑角色":"新增角色",visible:e.dialogVisiblerole,width:"25%"},on:{"update:visible":function(t){e.dialogVisiblerole=t}}},[r("el-form",{ref:"roleValidateForm",staticClass:"demo-ruleForm",attrs:{model:e.roleValidateForm,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"角色名",prop:"role_name",rules:[{required:!0,message:"角色名不能为空"}]}},[r("el-input",{attrs:{type:"input",autocomplete:"off"},model:{value:e.roleValidateForm.role_name,callback:function(t){e.$set(e.roleValidateForm,"role_name",t)},expression:"roleValidateForm.role_name"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"role_code",label:"角色编码"}},[r("el-input",{attrs:{type:"input",autocomplete:"off"},model:{value:e.roleValidateForm.role_code,callback:function(t){e.$set(e.roleValidateForm,"role_code",t)},expression:"roleValidateForm.role_code"}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("roleValidateForm")}}},[e._v("提交")]),e._v(" "),r("el-button",{on:{click:function(t){return e.resetForm("roleValidateForm")}}},[e._v("重置")])],1)],1),e._v(" "),r("div",{staticClass:"btn-box"},[r("el-button",{attrs:{size:"mini",icon:"el-icon-circle-plus-outline",type:"primary"},on:{click:e.createDialog}},[e._v("新建")])],1),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,size:"small",border:"",stripe:"",fit:""}},[r("el-table-column",{attrs:{align:"center",fixed:"",prop:"role_id",label:"角色ID",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",fixed:"",prop:"role_code",label:"角色编码"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",prop:"role_name",label:"角色名称"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"操作",width:"00"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"hasAuth",rawName:"v-hasAuth",value:"sys:role:lookPerms",expression:"'sys:role:lookPerms'"}],attrs:{type:"primary",icon:"el-icon-view",size:"mini",effect:"dark"},on:{click:function(r){return e.checksEdit(t.row,!0)}}},[e._v("查看权限")]),e._v(" "),r("el-button",{directives:[{name:"hasAuth",rawName:"v-hasAuth",value:"sys:role:editPerms",expression:"'sys:role:editPerms'"}],attrs:{type:"warning",icon:"el-icon-edit",size:"mini",effect:"dark"},on:{click:function(r){return e.checksEdit(t.row,!1)}}},[e._v("编辑权限")]),e._v(" "),r("el-button",{directives:[{name:"hasAuth",rawName:"v-hasAuth",value:"sys:role:update",expression:"'sys:role:update'"}],attrs:{icon:"el-icon-edit",type:"primary",effect:"dark",size:"mini"},on:{click:function(r){e.changeRoleName(t.row,!1),e.isRoleCheck=!0}}},[e._v("修改")]),e._v(" "),r("el-button",{directives:[{name:"hasAuth",rawName:"v-hasAuth",value:"sys:role:delete",expression:"'sys:role:delete'"}],attrs:{type:"danger",effect:"dark",icon:"el-icon-delete",size:"mini"},on:{click:function(r){return e.deleteRole(t.row,!1)}}},[e._v("删除")])]}}])})],1)],1)},staticRenderFns:[]},d=r("VU/8")(l,c,!1,null,null,null);t.default=d.exports}});
//# sourceMappingURL=15.d95dd11a2bdae20f924a.js.map