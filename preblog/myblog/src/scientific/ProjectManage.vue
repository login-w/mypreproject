<template>
  <div>
    <div>
<!--     搜索栏-->
      <div class="input-search1">
        <el-input
            size="small"
            class="input-search"
            placeholder="根据项目名称查询"
            prefix-icon="el-icon-search"
            style="width: 170px"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="projectSearch.pname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据项目编号查询"
            prefix-icon="el-icon-search"
            style="width: 170px"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="projectSearch.number">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据项目组长名称查询"
            prefix-icon="el-icon-search"
            style="width: 200px"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="projectSearch.sname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据项目指导老师查询"
            style="width: 200px"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="projectSearch.tname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据项目所属学院名称查询"
            style="width: 220px"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="projectSearch.acaName">
        </el-input>
      </div>
      <el-button type="primary" class="searchButton" icon="el-icon-search" size="small" @click="initPositions">查询项目</el-button>
      <el-button type="warning"
                 size="small"
                 class="AddButton"
                 icon="el-icon-circle-plus"
                 :style="{display:addVisible}"
                 @click="addProject">添加项目</el-button>
    </div>
<!--    表格数据-->
    <div class="CourseTable">
      <el-table
          size="small"
          :data="positions"
          stripe
          border
          style="width: 100%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            type="index"
            label="序号"
            width="50">
        </el-table-column>
<!--        <el-table-column-->
<!--            prop="id"-->
<!--            label="数据编号"-->
<!--            width="85">-->
<!--        </el-table-column>-->
        <el-table-column
            prop="number"
            label="项目编号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="pname"
            label="项目名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="项目组长"
            width="80">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="指导教师"
            width="80">
        </el-table-column>
        <el-table-column
            prop="state"
            label="状态"
            width="80">
        </el-table-column>
        <el-table-column
            prop="type"
            label="项目类别"
            width="80">
        </el-table-column>
        <el-table-column
            prop="descripe"
            label="项目描述"
            width="120">
        </el-table-column>
        <el-table-column
            prop="applytime"
            label="申请时间"
            :formatter="carTimeFilter"
            width="120">
        </el-table-column>
        <el-table-column
            prop="funds"
            label="项目经费"
            width="120">
        </el-table-column>
        <el-table-column
            prop="acaName"
            label="所属学院"
            width="95">
        </el-table-column>
        <!--        操作列-->
        <el-table-column label="操作" class="operateColumn" width="260px">
          <template #default="scope">
            <el-button
                icon="el-icon-edit"
                size="mini"
                type="success"
                :style="{display:editVisible}"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                :style="{display:deleteVisible}"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button
                icon="el-icon-circle-plus"
                size="mini"
                type="primary"
                @click="selectProject(scope.$index, scope.row)">申报
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    添加、修改弹出框-->
    <el-dialog
        title="项目管理"
        :visible.sync="dialogVisible"
        width="60%">
      <div>
        <el-form ref="projectForm" :model="project">
          <el-row>
            <el-col :span="12">
              <template>
                <el-form-item label="*项目名称：" prop="pname">
                  <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="project.pname"
                            placeholder="请输入项目名称"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template>
                <el-form-item label="*编 号 ：" prop="number">
                  <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="project.number"
                            placeholder="请输入项目编号"></el-input>
                </el-form-item>
              </template>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="*项目类型：" prop="capacity">
                <el-select v-model="project.type" size="small" style="width: 180px" placeholder="请选择项目类型">
                  <el-option
                      v-for="item in type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="*项目所属学院:" prop="acaName">
                <el-select v-model="project.acaid" size="small" style="width: 180px" placeholder="请选择所属学院">
                  <el-option
                      v-for="item in acaids"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="*项目状态：" prop="state">
                <el-select v-model="project.state" size="small" style="width: 180px" placeholder="请选择当前项目状态">
                  <el-option
                      v-for="item in states"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="*项目经费：" prop="funds">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="project.funds"
                          placeholder="请输入项目经费"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="*项目组长:" prop="sidcard">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="project.sidcard"
                          placeholder="请输入项目组长学号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="*项目起始日期:" prop="applytime">
                <el-date-picker
                    style="width: 180px"
                    v-model="project.applytime"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目描述:" prop="descripe">
                  <el-input size="small"
                            type="textarea"
                            prefix-icon="el-icon-edit"
                            style="width: 180px"
                            v-model="project.descripe"
                            placeholder="请输入项目描述"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="*指导教师" prop="tidcard">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="project.tidcard"
                          placeholder="请输入项目指导老师员工号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span class="dialog-footer" style="display: flex;justify-content: flex-end">
      <el-button
          size="small"
          @click="dialogVisible = false">取 消</el-button>
      <el-button
          size="small"
          type="primary"
          @click="doUpdate">提 交</el-button>
    </span>
    </el-dialog>
    <!--    分页-->
    <div style="display: flex;justify-content: flex-end" >
      <el-pagination
          background
          @current-change="currentChange"
          :page-sizes="number"
          @size-change="sizeChange"
          layout="sizes,prev,pager,next,jumper,->,total"
          page-size="5"
          :total="this.pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import moment from "moment";
import {Message} from "element-ui";
export default {
  name: "ProjectManage",
  data() {
    return {
      states:[
        {
          value: '未发布',
          label: '未发布'
        },
        {
          value: '已发布',
          label: '已发布'
        }
      ],
      type: [
        {
          value: '理科',
          label: '理科'
        },
        {
          value: '工科',
          label: '工科'
        },
        {
          value: '文科',
          label: '文科'
        },
        {
          value: '艺术',
          label: '艺术'
        }
      ],
      project:{
        add:"",
        pname:"",
        number:null,
        leader:null,
        sname:"",
        guide:null,
        tname:"",
        state:"",
        type:"",
        descripe:"",
        applytime:"",
        funds:"",
        acaid:null,
        acaName:"",
        sidcard:"",
        tidcard:""
      },
      editVisible: '',   //显示、隐藏
      deleteVisible:"",
      addVisible:"",
      selectVisible:"",
      user:{},
      userInfo:{},
      acaids: [],
      dialogVisible: false,
      projectSearch: {
        pname:"",
        number:"",
        sname:"",
        tname:"",
        acaName:""
      },
      positions: [],
      number:[5,10,20],
      pageInfo:{
        total:0,
        startPage:1,
        size:5
      },
      stuProject:{
        pid:"",
        sid:""
      }
    }
  },

  mounted() {
    this.initUser();
    this.initUserInfo();
    this.initPositions();
  },
  methods: {
    selectProject(index, data){
      if (this.user.sid!=null){
        this.stuProject.pid=data.id;
        this.stuProject.sid=this.user.sid;
        this.postRequest("/scientific/addStuProject",this.stuProject).then(resp=>{

        })
      }else{
        Message.error({message: '权限不足,该操作仅限学生'});
      }

    },
    initStuProject(){
      this.stuProject.pid="";
      this.stuProject.sid="";
    },
    initProject(){
      this.project.add="1";
      this.project.acaName="";
      this.project.acaid="";
      this.project.applytime="";
      this.project.descripe="";
      this.project.funds="";
      this.project.guide="";
      this.project.tname="";
      this.project.leader="";
      this.project.sname="";
      this.project.number="";
      this.project.pname="";
      this.project.state="";
      this.project.type="";
      this.project.tidcard="";
      this.project.sidcard="";
    },
    addProject(){
      this.initProject();
      this.dialogVisible = true;
    },
    doUpdate(){
      if (this.project.add == ("1")) {
        this.postRequest("/scientific/project", this.project).then(resp => {
          if (resp) {
            this.initPositions();
            this.project.add = "";
            this.dialogVisible = false;
          }
        })
      } else {
        this.putRequest("/scientific/project", this.project).then(resp => {
          if (resp) {
            this.initPositions();
            this.dialogVisible = false;
          }
        })
      }
    },
    initUser(){
      this.user=null;
    },
    initUserInfo(){
      this.userInfo=null;
    },
    sizeChange(size){
      this.pageInfo.size=size;
      this.initPositions();
    },
    carTimeFilter(row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        return moment(daterc).format("YYYY-MM-DD")
      }
    },
    currentChange(currentPage){
      this.pageInfo.startPage=currentPage;
      this.initPositions();
    },
    handleEdit(index, data) {
      Object.assign(this.project, data);
      this.project.add="";
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除['+data.pname+']项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // alert(data.id)
        this.deleteRequest('/scientific/project/'+data.id).then(resp=>{
          if (resp){
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    initPositions() {
      this.user= window.localStorage.getItem('user');
      this.user=JSON.parse(this.user);
      if (this.user.mid!=null){
        this.userInfo=this.user.managerInfo;
      }
      // alert(JSON.stringify(this.user));

      if (this.user.authority!=1){
        if(this.user.authority==2){
          this.deleteVisible='none';
          this.editVisible='none';
        }else{
          this.editVisible='none';
          this.addVisible='none';
          this.deleteVisible='none';
        }

      }
      if(this.user.sid!=null){
        this.getRequest('/scientific/getAllProject?startPage='
            +this.pageInfo.startPage+'&size='+this.pageInfo.size
            +'&pname='+this.projectSearch.pname+'&number='+this.projectSearch.number
            +'&sname='+this.projectSearch.sname+'&tname='+this.projectSearch.tname
            +'&acaName='+this.projectSearch.acaName
            +'&state='+"已发布").then(resp => {
          if (resp) {
            this.positions=resp.data.data;
            this.pageInfo.total=resp.data.total;
          }
        })
      }else{
        this.getRequest('/scientific/getAllProject?startPage='
            +this.pageInfo.startPage+'&size='+this.pageInfo.size
            +'&pname='+this.projectSearch.pname+'&number='+this.projectSearch.number
            +'&sname='+this.projectSearch.sname+'&tname='+this.projectSearch.tname
            +'&acaName='+this.projectSearch.acaName).then(resp => {
          if (resp) {
            this.positions=resp.data.data;
            this.pageInfo.total=resp.data.total;
          }
        })
      }

      this.getRequest('/teach/getAllAca').then(resp => {
        if (resp) {
          this.acaids = resp.data;
        }
      })
    },
    init(obj1,obj2){
    }
  }
}
</script>

<style scoped>
.input-search1{
  margin-bottom: 5px;
  margin-top: 5px;
}
.searchButton {
  /*padding-right: 10px;*/
  margin-left: 6cm;
  margin-right: 6cm;
}

.CoursePage {
  margin-top: 30px;

}

.CourseTable {
  margin-top: 10px;
}

.input-search {
  width: 200px;
  margin-right: 6px;
}
</style>