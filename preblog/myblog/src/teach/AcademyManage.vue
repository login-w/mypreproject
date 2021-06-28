<template>
  <div>
    <div>
      <div>

      </div>
      <div class="input-search1">
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入学院名称"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.name">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入学院类别"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="searchObj.type">
        </el-input>
      </div>
      <el-button type="primary" class="searchButton" icon="el-icon-search" size="small" @click="initPositions">搜索学院
      </el-button>
      <el-button type="warning"
                 size="small"
                 class="AddButton"
                 :style="{display: addVisible}"
                 icon="el-icon-circle-plus"
                 @click="addAcademy">添加学院</el-button>
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
            label="学院名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="type"
            label="学院类别"
            width="120">
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
        title="学院管理"
        :visible.sync="dialogVisible"
        width="60%">
      <div>
        <el-form ref="academyForm" :model="academy">
          <el-row>
            <el-col :span="12">
              <el-form-item label="学院名称：" prop="name">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="academy.name"
                          placeholder="请输入课程名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <template>
                <el-form-item label="学院类别：" prop="type">
                  <el-select v-model="academy.type" size="small" style="width: 180px" placeholder="请选择学院类型">
                    <el-option
                        v-for="item in AcademyType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
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
<!--               style="margin-top: 10px"-->
<!--               :style="{display: deleteVisible}"-->
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

export default {
  name: "AcademyManage",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible:"",
      addVisible:"",
      selectVisible:"",
      user:{},
      userInfo:{},
      academy:{
        add:"",
        name:"",
        type:""
      },
      AcademyType: [
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
      multipleSelection: [],
      searchObj: {
        name: "",
        type: ""
      },
      positions: [],
      dialogVisible: false,
      number: [5, 10, 20],
      pageInfo: {
        total: 0,
        startPage: 1,
        size: 5
      },

    }
  },

  mounted() {
    this.initPositions();
  },
  methods: {
    initAcademy(){
      this.academy.name="";
      this.academy.add="1";
      this.academy.type="";
    },
    addAcademy(){
      this.initAcademy();
      this.dialogVisible=true;
    },
    doUpdate(){
      if (this.academy.add == ("1")) {
        this.postRequest("/teach/academy", this.academy).then(resp => {
          if (resp) {
            this.initPositions();
            this.academy.add = "";
            this.dialogVisible = false;
          }
        })
      } else {
        this.putRequest("/teach/academy", this.academy).then(resp => {
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
      Object.assign(this.academy, data);
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.name + ']学院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // alert(data.id)
        this.deleteRequest('/teach/academy/' + data.id).then(resp => {
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
      this.getRequest('/teach/getAllAcademy?startPage=' + this.pageInfo.startPage
          + '&size=' + this.pageInfo.size + '&name=' + this.searchObj.name
          + '&type=' + this.searchObj.type).then(resp => {
        if (resp) {
          this.positions = resp.data.data;
          this.pageInfo.total = resp.data.total;
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