<template>
  <div>
    <!--    条件查询-->
    <div>
      <div class="input-search1" :style="{display: addVisible}">
        <el-input
            size="small"
            style="width: 170px"
            class="input-search"
            placeholder="根据学生姓名查询"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.name">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            style="width: 170px"
            placeholder="根据学生学号查询"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.idcard">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            style="width: 160px"
            placeholder="根据学院查询"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.acaName">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据专业查询"
            style="width: 160px"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.specialName">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据导师查询"
            style="width: 160px"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.tname">
        </el-input>
      </div>
      <el-button type="primary" class="searchButton" icon="el-icon-search" :style="{display: addVisible}" size="small"
                 @click="initPositions">查询学生
      </el-button>
      <el-button type="warning"
                 size="small"
                 class="AddButton"
                 icon="el-icon-circle-plus"
                 :style="{display: addVisible}"
                 @click="addStudent">添加学生
      </el-button>
    </div>
    <!--    表格数据-->
    <div class="CourseTable">
      <el-table
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
            prop="name"
            label="学生姓名"
            width="95">
        </el-table-column>
        <el-table-column
            prop="idcard"
            label="学生学号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="birth"
            label="出生日期"
            :formatter="carTimeFilter"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="70">
        </el-table-column>
        <el-table-column
            prop="acaName"
            label="所属学院"
            width="90">
        </el-table-column>
        <el-table-column
            prop="specialName"
            label="专业"
            width="95">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="住址"
            width="95">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="导师"
            width="95">
        </el-table-column>
        <!--        操作列-->
        <el-table-column label="操作" class="operateColumn" width="200px">
          <template #default="scope">
            <el-button
                icon="el-icon-edit"
                size="mini"
                type="success"
                :style="{display: editVisible}"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                :style="{display: deleteVisible}"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    添加、修改弹出框-->
    <el-dialog
        title="学生管理"
        :visible.sync="dialogVisible"
        width="60%">
      <div>
        <el-form ref="teacherForm" :model="student">
          <el-row>
            <el-col :span="12">
              <el-form-item label="学生姓名" prop="name">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="student.name"
                          placeholder="请输入学生姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <template>
                <el-form-item label="出生日期：" prop="birth">
                  <el-date-picker
                      style="width: 180px"
                      v-model="student.birth"
                      type="date"
                      size="small"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学生性别：" prop="capacity">
                <el-radio-group style="width: 200px" v-model="student.sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属学院：" prop="acaName">
                <el-select v-model="student.acaid"
                           size="small" style="width: 180px"
                           @change="updateSpecial($event)"
                           placeholder="请选择学生所属学院">
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
              <el-form-item label="所学专业：" prop="specialid">
                <el-select v-model="student.specialid" size="small" style="width: 180px" placeholder="请选择课程所学专业">
                  <el-option
                      v-for="item in specials"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生学号：" prop="idcard">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="student.idcard"
                          placeholder="请输入学生学号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="地 址：" prop="addr">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="student.addr"
                          placeholder="请输入学生住址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="导 师：" prop="acaid">
                <el-select v-model="student.tid" size="small" style="width: 180px" placeholder="请选择导师">
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
        </el-form>
      </div>
      <span class="dialog-footer" style="display: flex;justify-content: flex-end">
      <el-button
          size="small"
          @click="dialogVisible = false,this.student.add=''">取 消</el-button>
      <el-button
          size="small"
          type="primary"
          @click="doUpdate">提 交</el-button>
    </span>
    </el-dialog>
    <!--    批量删除按钮-->
<!--    <el-button size="small"-->
<!--               type="danger"-->
<!--               :style="{display: deleteVisible}"-->
<!--               style="margin-top: 10px"-->
<!--               :disabled="this.multipleSelection.length==0">批量删除-->
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
import moment from 'moment';

export default {
  name: "StudentManage",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible: "",
      addVisible: "",
      selectVisible: "",
      user: {},
      userInfo: {},
      teachers: [],
      acaids: [],
      specials: [],
      multipleSelection: [],
      searchObj: {
        id: "",
        name: "",
        idcard: "",
        acaName: "",
        specialName: "",
        tname: ""
      },
      dialogVisible: false,
      positions: [],
      number: [5, 10, 20],
      pageInfo: {
        total: 0,
        startPage: 1,
        size: 5
      },
      student: {
        add: "",
        name: "",
        birth: "",
        sex: "",
        acaid: "",
        acaName: "",
        specialid: "",
        specialName: "",
        idcard: "",
        addr: "",
        tid: "",
        tname: ""
      }
    }
  },

  mounted() {
    this.initPositions();
  },
  methods: {
    updateSpecial(event){
      this.getRequest('/teach/getAllSpecial?acaid='+event).then(resp => {
        if (resp) {
          this.specials = resp.data;
        }
      })
    },
    initStudent() {
      this.student.add = "1";
      this.student.idcard = "";
      this.student.specialid = "";
      this.student.specialName = "";
      this.student.acaid = "";
      this.student.acaName = "";
      this.student.addr = "";
      this.student.birth = "";
      this.student.sex = "";
      this.student.tid = "";
      this.student.tname = "";
      this.student.name = "";
    },
    addStudent() {
      this.initStudent();
      this.dialogVisible = true;
    },
    doUpdate() {
      if (this.student.add == ("1")) {
        this.postRequest("/teach/student", this.student).then(resp => {
          if (resp) {
            this.initPositions();
            this.student.add = "";
            this.dialogVisible = false;
          }
        })
      } else {
        this.putRequest("/teach/student", this.student).then(resp => {
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
    carTimeFilter(row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        return moment(daterc).format("YYYY-MM-DD")
      }
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
      Object.assign(this.student, data);
      this.student.add="";
      this.updateSpecial(data.acaid)
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.name + ']学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // alert(data.id)
        this.deleteRequest('/teach/student/' + data.id).then(resp => {
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
      this.user = window.localStorage.getItem('user');
      this.user = JSON.parse(this.user);
      if (this.user.mid != null) {
        this.userInfo = this.user.managerInfo;
      }
      // alert(JSON.stringify(this.user));
      if (this.user.authority != 1) {
        this.editVisible = 'none';
        this.addVisible = 'none';
        this.deleteVisible = 'none';
      }
      if (this.user.sid != null) {
        this.getRequest('/teach/getAllStudent?startPage=' + this.pageInfo.startPage
            + '&size=' + this.pageInfo.size + '&name=' + this.searchObj.name
            + '&idcard=' + this.searchObj.idcard + '&acaName=' + this.searchObj.acaName
            + '&specialName=' + this.searchObj.specialName
            + '&tname=' + this.searchObj.tname
            + '&id=' + this.user.sid).then(resp => {
          if (resp) {
            this.positions = resp.data.data;
            this.pageInfo.total = resp.data.total;
          }
        })
      } else {
        if (this.user.tid != null) {
          this.getRequest('/teach/getAllStudent?startPage=' + this.pageInfo.startPage
              + '&size=' + this.pageInfo.size + '&name=' + this.searchObj.name
              + '&idcard=' + this.searchObj.idcard + '&acaName=' + this.searchObj.acaName
              + '&specialName=' + this.searchObj.specialName
              + '&tname=' + this.searchObj.tname + '&tid=' + this.user.tid).then(resp => {
            if (resp) {
              this.positions = resp.data.data;
              this.pageInfo.total = resp.data.total;
            }
          })
        } else {
          this.getRequest('/teach/getAllStudent?startPage=' + this.pageInfo.startPage
              + '&size=' + this.pageInfo.size + '&name=' + this.searchObj.name
              + '&idcard=' + this.searchObj.idcard + '&acaName=' + this.searchObj.acaName
              + '&specialName=' + this.searchObj.specialName
              + '&tname=' + this.searchObj.tname).then(resp => {
            if (resp) {
              this.positions = resp.data.data;
              this.pageInfo.total = resp.data.total;
            }
          })
        }
      }
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