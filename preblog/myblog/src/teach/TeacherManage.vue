<template>
  <div>
    <div>
      <div>

      </div>
      <div class="input-search1" :style="{display:addVisible}">
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入教师名称"
            prefix-icon="el-icon-search"
            @keydown.enter.native="initPositions"
            clearable
            @clear="initPositions"
            v-model="searchObj.tname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据教师所属学院名称"
            prefix-icon="el-icon-search"
            @keydown.enter.native="initPositions"
            clearable
            @clear="initPositions"
            v-model="searchObj.acaName">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据教师职称查询"
            prefix-icon="el-icon-search"
            @keydown.enter.native="initPositions"
            clearable
            @clear="initPositions"
            v-model="searchObj.title">
        </el-input>
      </div>
      <el-button type="primary" class="searchButton" :style="{display:addVisible}" icon="el-icon-search" size="small" @click="initPositions">搜索教师
      </el-button>
      <el-button type="warning"
                 size="small"
                 class="AddButton"
                 :style="{display:addVisible}"
                 icon="el-icon-circle-plus"
                 @click="addTeacher">添加教师
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
            prop="tname"
            label="教师名称"
            width="85">
        </el-table-column>
        <el-table-column
            prop="age"
            label="出生日期"
            :formatter="carTimeFilter"
            width="120">
        </el-table-column>
        <el-table-column
            prop="tel"
            label="联系方式"
            width="100">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="教师性别"
            width="95">
        </el-table-column>
        <el-table-column
            prop="title"
            label="教师职称"
            width="95">
        </el-table-column>
        <el-table-column
            prop="acaName"
            label="所属学院"
            width="95">
        </el-table-column>
        <el-table-column
            prop="idcard"
            label="教师编号"
            width="95">
        </el-table-column>
        <!--操作列。编辑、删除-->
        <el-table-column label="操作" class="operateColumn" width="200px">
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    添加、修改弹出框-->
    <el-dialog
        title="教师管理"
        :visible.sync="dialogVisible"
        width="60%">
      <div>
        <el-form ref="teacherForm" :model="teacher">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓 名 ：" prop="tname">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="teacher.tname"
                          placeholder="请输入教师姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <template>
                <el-form-item label="性 别 ：" prop="sex">
                  <el-radio-group style="width: 200px" v-model="teacher.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="出生日期：" prop="birth">
                <el-date-picker
                    style="width: 180px"
                    v-model="teacher.age"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教师职称:" prop="title">
                <el-select v-model="teacher.title" size="small" style="width: 180px" placeholder="请选择教师职称">
                  <el-option
                      v-for="item in titles"
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
                <el-select v-model="teacher.acaid" size="small" style="width: 180px" placeholder="请选择教师所属学院">
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
              <el-form-item label="教师编号：" prop="acaName">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="teacher.idcard"
                          placeholder="请输入教师编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="教师联系方式：" prop="tel">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 180px" v-model="teacher.tel"
                          placeholder="请输入教师联系方式"></el-input>
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
<!--    <el-button size="small"-->
<!--               type="danger"-->
<!--               :style="{display:deleteVisible}"-->
<!--               style="margin-top: 10px"-->
<!--               :disabled="this.multipleSelection.length==0">批量删除-->
<!--    </el-button>-->
    <!--    分页-->
    <!--    style="display: flex;justify-content: flex-end"-->
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
  name: "TeacherManage",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible:"",
      addVisible:"",
      selectVisible:"",
      user:{},
      userInfo:{},
      number: [5, 10, 20],
      pageInfo: {
        total: 0,
        startPage: 1,
        size: 5
      },
      searchObj: {
        id: "",
        tname: "",
        acaName: "",
        title: ""
      },
      positions: [],
      multipleSelection: [],
      dialogVisible: false,
      titles: [
        {
          value: '讲师',
          label: '讲师'
        }, {
          value: '教授',
          label: '教授'
        }, {
          value: '副教授',
          label: '副教授'
        }, {
          value: '助教',
          label: '助教'
        }
      ],
      teacher: {
        add: "",
        tname: "",
        age: "",
        tel: "",
        sex: "",
        title: "",
        acaid: "",
        acaName: "",
        idcard: ""
      },
      acaids: []
    }
  },

  mounted() {
    this.initPositions();
  },
  methods: {
    initTeacher() {
      this.teacher.title = "";
      this.teacher.acaid = "";
      this.teacher.idcard = "";
      this.teacher.age = "";
      this.teacher.tname = "";
      this.teacher.acaName = "";
      this.teacher.tel = "";
      this.teacher.sex = "";
      this.teacher.add = "1";
    },
    addTeacher() {
      this.initTeacher();
      this.dialogVisible = true;
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
    doUpdate() {
      if (this.teacher.add == ("1")) {
        this.postRequest("/teach/teacher", this.teacher).then(resp => {
          if (resp) {
            this.initPositions();
            this.teacher.add = "";
            this.dialogVisible = false;
          }
        })
      } else {
        this.putRequest("/teach/teacher", this.teacher).then(resp => {
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
    handleEdit(index, data) {
      Object.assign(this.teacher, data);
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.tname + ']教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // alert(data.id)
        this.deleteRequest('/teach/teacher/' + data.id).then(resp => {
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
        this.editVisible='none';
        this.addVisible='none';
        this.deleteVisible='none';
      }
      if (this.user.tid!=null){
        this.getRequest('/teach/getAllTeacher/?startPage=' + this.pageInfo.startPage
            + '&size=' + this.pageInfo.size + '&tname=' + this.searchObj.tname
            + '&acaName=' + this.searchObj.acaName + '&title=' + this.searchObj.title
            +'&id='+this.user.tid).then(resp => {
          if (resp) {
            this.positions = resp.data.data;
            this.pageInfo.total = resp.data.total;
          }
        })
      }else{
        this.getRequest('/teach/getAllTeacher/?startPage=' + this.pageInfo.startPage
            + '&size=' + this.pageInfo.size + '&tname=' + this.searchObj.tname
            + '&acaName=' + this.searchObj.acaName + '&title=' + this.searchObj.title).then(resp => {
          if (resp) {
            this.positions = resp.data.data;
            this.pageInfo.total = resp.data.total;
          }
        })
      }

      this.getRequest('/teach/getAllAca').then(resp => {
        if (resp) {
          this.acaids = resp.data;
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
  text-align: center;
  margin: 20px auto
}

.CourseTable {
  margin-top: 10px;
}

.input-search {
  width: 200px;
  margin-right: 6px;
}
</style>