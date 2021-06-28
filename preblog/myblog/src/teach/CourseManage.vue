<template>
  <div>
    <div>
      <div>

      </div>
      <div class="input-search1">
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入课程名称"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.name">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入课程的编号信息"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.number">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入任课教师"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.tname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入学院信息"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.acaname">
        </el-input>
      </div>
      <el-button type="primary" class="searchButton" icon="el-icon-search" size="small" @click="initPositions">搜索课程
      </el-button>
      <el-button type="warning"
                 size="small"
                 class="AddButton"
                 icon="el-icon-circle-plus"
                 @click="addCourse"
                 :style="{display: addVisible }">添加课程
      </el-button>
    </div>
    <!--    表格数据-->
    <div class="CourseTable">
      <el-table
          :default-sort = "{prop: 'id', order: 'ascending'}"
          @selection-change="handleSelectionChange"
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
            label="课程编号"
            width="95">
        </el-table-column>
        <el-table-column
            prop="name"
            label="课程名称"
            width="95">
        </el-table-column>
        <el-table-column
            prop="capacity"
            label="课程容量"
            width="70">
        </el-table-column>
        <el-table-column
            prop="category"
            label="课程类型"
            width="95">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="任课教师名称"
            width="95">
        </el-table-column>
        <el-table-column
            prop="acaname"
            label="所属学院名称"
            width="95">
        </el-table-column>
        <el-table-column
            prop="coursehour"
            label="周次(x周/学期)"
            width="110">
        </el-table-column>
        <el-table-column
            prop="times"
            label="节次(x节/周)"
            width="110">
        </el-table-column>
        <!--        操作列-->
        <el-table-column label="操作" class="operateColumn" width="260px">
          <template #default="scope">
            <el-button
                icon="el-icon-edit"
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                :style="{display: editVisible}">编辑
            </el-button>
            <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :style="{display: deleteVisible}">删除
            </el-button>
            <el-button
                icon="el-icon-plus"
                size="mini"
                type="success"
                :style="{display: selectVisible}"
                @click="selectCourse(scope.$index, scope.row)">选课
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    添加、修改弹出框-->
    <el-dialog
        title="课程管理"
        :visible.sync="dialogVisible"
        width="60%">
      <div>
        <el-form ref="teacherForm" :model="course">
          <el-row>
            <el-col :span="12">
              <el-form-item label="课程名称：" prop="name">
                <el-input :readonly="read" size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="course.name"
                          placeholder="请输入课程名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <template>
                <el-form-item label="编 号 ：" prop="number">
                  <el-input size="small" :readonly="read" prefix-icon="el-icon-edit" style="width: 200px" v-model="course.number"
                            placeholder="请输入课程编号"></el-input>
                </el-form-item>
              </template>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="课程容量：" prop="capacity">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="course.capacity"
                          placeholder="请输入课程容量"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程类型:" prop="category">
                <el-select v-model="course.category" size="small" style="width: 180px" placeholder="请选择课程类型">
                  <el-option
                      v-for="item in categorys"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属学院：" prop="acaName">
                <el-select v-model="course.acaid" size="small" style="width: 180px" placeholder="请选择课程所属学院">
                  <el-option
                      v-for="item in acaids"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任课教师" prop="tname">
                <el-select v-model="course.tid" size="small" style="width: 180px" placeholder="请选择任课教师">
                  <el-option
                      v-for="item in teachers"
                      :key="item.tname"
                      :label="item.tname"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="周 次：" prop="coursehour">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="course.coursehour"
                          placeholder="请输入课时"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="节次(/周)" prop="times">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="course.times"
                          placeholder="请输入课程每周的节次数"></el-input>
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
    <!--    批量删除按钮-->
<!--    <el-button size="small" type="danger"-->
<!--               style="margin-top: 10px"-->
<!--               :disabled="this.multipleSelection.length==0" :style="{display:deleteVisible}">批量删除-->
<!--    </el-button>-->
    <!--    分页-->
    <div style="display: flex;justify-content: flex-end">
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

import {Message} from "element-ui";

export default {
  name: "CourseManage",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible:"",
      addVisible:"",
      selectVisible:"",
      user:{},
      userInfo:{},
      acaids: [],
      read:"true",
      teachers: [],
      categorys: [
        {
          value: '必修',
          label: '必修'
        },
        {
          value: '选修',
          label: '选修'
        }
      ],
      multipleSelection: [],
      searchObj: {
        id: "",
        name: "",
        number: "",
        tname: "",
        acaname: ""
      },
      positions: [],
      dialogVisible: false,
      number: [5, 10, 20],
      pageInfo: {
        total: 0,
        startPage: 1,
        size: 5
      },
      course: {
        id:"",
        add: "",
        name: "",
        number: "",
        capacity: "",
        category: "",
        tid: "",
        tname: "",
        acaid: "",
        acaname: "",
        coursehour: "",
        times: "",
        sid:"",
      },
      stuCourse:{
        cid:null,
        sid:null,
        tid:null
      }
    }
  },

  mounted() {
    this.initUser();
    this.initUserInfo();
    this.initPositions();
  },
  methods: {
    initUser(){
      this.user=null;
    },
    initUserInfo(){
      this.userInfo=null;
    },
    selectCourse(index, data){
      if (this.user.sid!=null){
        Object.assign(this.course, data);
        this.stuCourse.cid=this.course.id;
        this.stuCourse.sid=this.user.sid;
        this.stuCourse.tid=this.course.tid;
        this.postRequest("/teach/addStuCourse", this.stuCourse).then(resp => {
          if (resp){
            this.initPositions();
          }
        })
      }else{
        Message.error({message: '权限不足,该操作仅限学生'});
      }
    },
    addCourse() {
      this.read=false;
      this.initCourse();
      this.dialogVisible = true;
    },
    initCourse() {
      this.course.number = "";
      this.course.times = "";
      this.course.name = "";
      this.course.acaname = "";
      this.course.category = "";
      this.course.coursehour = "";
      this.course.acaid = "";
      this.course.tid = "";
      this.course.tname = "";
      this.course.capacity = "";
      this.course.add = "1";
    },
    doUpdate() {
      if (this.course.add == ("1")) {
        this.postRequest("/teach/course", this.course).then(resp => {
          if (resp) {
            this.initPositions();
            this.course.add = "";
            this.read=true;
            this.dialogVisible = false;

          }
        })
      } else {
        this.putRequest("/teach/course", this.course).then(resp => {
          if (resp) {
            this.initPositions();
            this.dialogVisible = false;
          }
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sizeChange(size) {
      this.pageInfo.size = size;
      this.initPositions();
    },
    currentChange(currentPage) {
      this.pageInfo.startPage = currentPage;
      this.initPositions();
    },
    handleEdit(index, data) {
      Object.assign(this.course, data);
      this.read=true;
      this.course.add="";
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.name + ']课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // alert(data.id)
        this.deleteRequest('/teach/course/' + data.id).then(resp => {
          if (resp) {
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
        if (this.user.authority==2){
          this.editVisible='none';
          this.addVisible='none';
          this.deleteVisible='none';
          this.selectVisible='none'
        }else{
          this.editVisible='none';
          this.addVisible='none';
          this.deleteVisible='none';
        }
      }
      if (this.user.tid!=null){
        this.getRequest('/teach/getAllCourse?startPage=' + this.pageInfo.startPage
            + '&size=' + this.pageInfo.size + '&name=' + this.searchObj.name
            + '&number=' + this.searchObj.number
            + '&tname=' + this.searchObj.tname + '&acaname='
            + this.searchObj.acaname+'&tid='+this.user.tid).then(resp => {
          if (resp) {
            this.positions = resp.data.data;
            this.pageInfo.total = resp.data.total;
          }
        })
      }
      this.getRequest('/teach/getAllCourse?startPage=' + this.pageInfo.startPage
          + '&size=' + this.pageInfo.size + '&name=' + this.searchObj.name
          + '&number=' + this.searchObj.number
          + '&tname=' + this.searchObj.tname + '&acaname='
          + this.searchObj.acaname).then(resp => {
        if (resp) {
          this.positions = resp.data.data;
          this.pageInfo.total = resp.data.total;
        }
      })
      this.getRequest('/teach/getAllAca').then(resp => {
        if (resp) {
          this.acaids = resp.data;
        }
      })
      this.getRequest('/teach/getTeacherList').then(resp => {
        if (resp) {
          this.teachers = resp.data;
        }
      })
    }
  }
}
</script>

<style scoped>
.input-search1 {
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