<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-image v-if="$userInfo()" style="width: 100px; height: 100px" :src="$userInfo().avatar" lazy></el-image>
                </el-col>
                <el-col :span="16">
                  <div class="csde-user-info" v-if="$userInfo()">
                    <span class="csde-userName">{{$userInfo().nick_name}}</span>
                    <p class="csde-email">{{$userInfo().email}}</p>
                    <el-tag style="margin:0px 5px" type="primary" effect="dark" v-for="(it, index) in $userInfo().role_list" :key="index" size="small">
                      {{it.role_name}}
                    </el-tag>
                  </div>
                </el-col>
            </el-row>
        </el-card>
      </el-col>
      <el-col :span="16">
         <el-card class="box-card">
           <div class="csde-grid-content-tb">
             <div class="csde-item">
                 <div class="csde-color-area" style="background:#2196f3">
                   <i class="el-icon-document"></i>
                 </div>
                 <div class="csde-info-tb" >
                    <div>
                      <p>123</p>
                      <p>文章</p>
                    </div>
                 </div>
             </div>

             <div class="csde-item">
                 <div class="csde-color-area" style="background:#f44336">
                   <i class="el-icon-chat-line-square"></i>
                 </div>
                 <div class="csde-info-tb">
                    <div>
                      <p>321</p>
                      <p>评论</p>
                    </div>
                 </div>
             </div>

             <div class="csde-item">
                 <div class="csde-color-area" style="background:#aa00ff">
                   <i class="el-icon-position"></i>
                 </div>
                 <div class="csde-info-tb">
                    <div>
                      <p>342</p>
                      <p>访问</p>
                    </div>
                 </div>
             </div>

              <div class="csde-item">
                 <div class="csde-color-area" style="background:#ef6c00">
                   <i class="el-icon-data-line"></i>
                 </div>
                 <div class="csde-info-tb">
                    <div>
                      <p>342</p>
                      <p>友链</p>
                    </div>
                 </div>
             </div>
           </div>
        </el-card>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="8">
        <el-card class="box-card">
            <sourceChart></sourceChart>
        </el-card>
      </el-col>
      <el-col :span="16">
         <el-card class="box-card">
           <activationChart></activationChart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import sourceChart from './components/sourceTb'
import activationChart from './components/activationTb'
export default {
  name: 'home',
  components: {
    sourceChart,
    activationChart
  },
  data () {
    return {}
  },
  mounted () {

  },
  methods: {},
  watch: {},
  created () {
  }
}
</script>
<style>
.box-card{
  margin: 10px;
}
.csde-user-info{
  padding: 0 10px;
}
.csde-userName{
  color: #2d8cf0;
  font-size: 28px;
}
.csde-email{
  padding: 10px 0;
}
.csde-grid-content-tb{
  display: flex;
  width: 100%;
}
.csde-grid-content-tb .csde-item{
  color: #2d8cf0;
  height: 100px;
  width: 100%;
  display: flex;
}
.csde-grid-content-tb .csde-item .csde-color-area{
  width: 50%;
  height: 100%;
  background: #2d8cf0;
  color: #fff;
  font-size: 28px;
  text-align: center;
  display: table;
}
.csde-grid-content-tb .csde-item .csde-color-area i{
  vertical-align: middle;
  display: table-cell;
}
.csde-info-tb{
  width: 100%;
  height: 100%;
  display: table;
  border: 1px solid #eee;
}
.csde-info-tb div{
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  color: #333;
}
#chart_table{
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
</style>
