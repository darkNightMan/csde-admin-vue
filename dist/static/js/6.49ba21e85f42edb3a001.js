webpackJsonp([6],{"3vTW":function(e,t){},rWE6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("woOf"),s=r.n(a),n=r("//Fk"),o=r.n(n),i=r("Xxa5"),l=r.n(i),c=r("exGp"),u=r.n(c),f=r("2CGT"),m={props:["$params","$tabsIndex"],data:function(){return{imageUrl:"",loading:!1,Headers:{token:localStorage.getItem("token")},uploadUrl:f.a.uploadImage,form:{title:"",class_id:"",tagsArr:[],cover_url:"",is_top:!1,content:"",article_id:""},classIdArr:[],tagsIdArr:[],rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}]}}},created:function(){this.init()},methods:{saveDoc:function(){},updateDoc:function(e,t){console.log(t)},onSubmit:function(){var e=this;return u()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!==e.$params.article_id){t.next=4;break}e.$refs.form.validate(function(){var t=u()(l.a.mark(function t(r){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!r){t.next=5;break}return t.next=3,e.createArticle();case 3:t.next=7;break;case 5:return console.log("error submit!!"),t.abrupt("return",!1);case 7:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}()),t.next=6;break;case 4:return t.next=6,e.updateArticle();case 6:e.loading=!1;case 7:case"end":return t.stop()}},t,e)}))()},init:function(){var e=this;return u()(l.a.mark(function t(){var r;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.all([e.Req.get(f.a.articleClassList),e.Req.get(f.a.articleTagsList)]);case 2:r=t.sent,e.classIdArr=r[0].data.list,e.tagsIdArr=r[1].data.list,void 0!==e.$params.article_id&&e.getDetail();case 6:case"end":return t.stop()}},t,e)}))()},createArticle:function(){var e=this;return u()(l.a.mark(function t(){var r,a,s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.Req.post(f.a.createArticle,e.form);case 3:r=t.sent,a=r.code,s=r.msg,200===a&&(e.$message({type:"success",message:s}),e.$params.init(),e.$closeTabs(e.$tabsIndex));case 7:case"end":return t.stop()}},t,e)}))()},updateArticle:function(){var e=this;return u()(l.a.mark(function t(){var r,a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.Req.put(f.a.updateArticle,s()(e.form,{article_id:e.$params.article_id}));case 2:r=t.sent,a=r.msg,200===r.code&&(e.$message({type:"success",message:a}),e.$params.init(),e.$closeTabs(e.$tabsIndex));case 6:case"end":return t.stop()}},t,e)}))()},handleAvatarSuccess:function(e,t){this.form.cover_url=e.data.path,this.imageUrl=URL.createObjectURL(t.raw)},getDetail:function(){var e=this;return u()(l.a.mark(function t(){var r,a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.Req.get(f.a.articleDetail,{article_id:e.$params.article_id});case 2:r=t.sent,a=r.data,200===r.code&&(e.imageUrl=a.cover_url,e.form.cover_url=a.cover_url,e.form.title=a.title,e.form.class_id=a.class_id,e.form.is_top=a.is_top,e.form.content=a.content,a.tagsArr.map(function(t){return e.form.tagsArr.push(t.tags_id)}));case 6:case"end":return t.stop()}},t,e)}))()}}},d={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-card",{staticClass:"box-card"},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",rules:e.rules}},[r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"文章分类"}},[r("el-radio-group",{model:{value:e.form.class_id,callback:function(t){e.$set(e.form,"class_id",t)},expression:"form.class_id"}},e._l(e.classIdArr,function(t,a){return r("el-radio",{key:a,attrs:{label:t.id}},[e._v(e._s(t.class_name))])}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"文章标签"}},[r("el-select",{attrs:{multiple:"",placeholder:"请选择标签"},model:{value:e.form.tagsArr,callback:function(t){e.$set(e.form,"tagsArr",t)},expression:"form.tagsArr"}},e._l(e.tagsIdArr,function(e,t){return r("el-option",{key:t,attrs:{label:e.tags_name,value:e.tags_id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"封面图"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.Headers,name:"images","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?r("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),r("el-form-item",{attrs:{label:"是否置顶"}},[r("el-switch",{model:{value:e.form.is_top,callback:function(t){e.$set(e.form,"is_top",t)},expression:"form.is_top"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"内容"}},[r("mavon-editor",{ref:"editor",attrs:{ishljs:!0},on:{save:e.saveDoc,change:e.updateDoc},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.onSubmit}},[e._v("提交")]),e._v(" "),r("el-button",[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var p=r("VU/8")(m,d,!1,function(e){r("3vTW")},null,null);t.default=p.exports}});
//# sourceMappingURL=6.49ba21e85f42edb3a001.js.map