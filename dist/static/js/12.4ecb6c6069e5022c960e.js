webpackJsonp([12],{"hQ/e":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Xxa5"),r=a.n(i),n=a("exGp"),s=a.n(n),o=a("2CGT"),l={props:[],methods:{handleSizeChange:function(e){this.queryParam.pageSize=e,this.init()},handleCurrentChange:function(e){this.queryParam.page=e,this.init()},init:function(){var e=this;return s()(r.a.mark(function t(){var a,i;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.Req.get(o.a.articleTagsList,e.queryParam);case 3:a=t.sent,i=a.data,200===a.code&&(e.tableData=i),e.loading=!1;case 8:case"end":return t.stop()}},t,e)}))()},actionEvents:function(e){this.currRow=e},checksEdit:function(e){this.isRoleCheck=!0,this.dialogVisiblerole=!0,this.roleValidateForm={tags_id:e.tags_id,tags_name:e.tags_name}},deleteTags:function(e){var t=this;this.$confirm("此操作将永久删除该标签吗, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(s()(r.a.mark(function a(){var i,n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.Req.delete(o.a.deleteTagsList,{data:{tags_id:e.tags_id}});case 2:i=a.sent,n=i.code,s=i.msg,200===n&&(t.init(),t.$message({type:"success",message:s}));case 6:case"end":return a.stop()}},a,t)}))).catch(function(){t.$message({type:"info",message:"已取消删除"})})},updateTags:function(){var e=this;return s()(r.a.mark(function t(){var a,i,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.Req.put(o.a.updateTagsList,e.roleValidateForm);case 2:a=t.sent,i=a.code,n=a.msg,200===i?(e.init(),e.$message({message:n,type:"success"}),e.dialogVisiblerole=!1):(e.dialogVisiblerole=!1,e.resetForm("roleValidateForm"));case 6:case"end":return t.stop()}},t,e)}))()},createDialog:function(){this.dialogVisiblerole=!0,this.isRoleCheck=!1,this.resetForm("roleValidateForm")},resetForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].resetFields()})},createTags:function(){var e=this;return s()(r.a.mark(function t(){var a,i,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.Req.post(o.a.createTagsList,e.roleValidateForm);case 2:a=t.sent,i=a.code,n=a.msg,200===i?(e.init(),e.$message({message:n,type:"success"}),e.dialogVisiblerole=!1):(e.dialogVisiblerole=!1,e.$message({message:n,type:"success"}),e.resetForm("roleValidateForm"));case 6:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.isRoleCheck?t.updateTags():t.createTags()})}},data:function(){return{tableData:[],isRoleCheck:!1,dialogVisiblerole:!1,queryParam:{page:1,pageSize:10,currentPage:1},roleValidateForm:{tags_name:"",tags_id:""}}},created:function(){this.init()}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:e.isRoleCheck?"编辑标签":"新增标签",visible:e.dialogVisiblerole,width:"20%"},on:{"update:visible":function(t){e.dialogVisiblerole=t}}},[a("el-form",{ref:"roleValidateForm",staticClass:"demo-ruleForm",attrs:{model:e.roleValidateForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"标签名",prop:"tags_name",rules:[{required:!0,message:"标签名不能为空"}]}},[a("el-input",{attrs:{type:"input",autocomplete:"off"},model:{value:e.roleValidateForm.tags_name,callback:function(t){e.$set(e.roleValidateForm,"tags_name",t)},expression:"roleValidateForm.tags_name"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("roleValidateForm")}}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("roleValidateForm")}}},[e._v("重置")])],1)],1),e._v(" "),a("div",{staticClass:"btn-box"},[a("el-button",{attrs:{icon:"el-icon-circle-plus-outline",type:"primary",size:"mini"},on:{click:e.createDialog}},[e._v("新建")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{height:e.$tableHeight(),data:e.tableData.list,size:"small",border:"",stripe:"",fit:"","highlight-current-row":""},on:{"row-click":e.actionEvents}},[a("el-table-column",{attrs:{align:"center",fixed:"",prop:"tags_id",label:"ID",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"tags_name",label:"标签名"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",effect:"dark",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return e.checksEdit(t.row,!1)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"danger",effect:"dark",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.deleteTags(t.row,!1)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"page-bottom"},[a("el-pagination",{attrs:{"current-page":e.queryParam.currentPage,"page-sizes":[10,20,30,40],"page-size":e.queryParam.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.tableData.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]},u=a("VU/8")(l,c,!1,null,null,null);t.default=u.exports}});
//# sourceMappingURL=12.4ecb6c6069e5022c960e.js.map