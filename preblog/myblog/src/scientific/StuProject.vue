<template>
  <div>
    <div>
      <div >

      </div>
      <div class="input-search1">
        <el-input
            size="small"
            class="input-search"
            placeholder="根据项目名称查询"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="stuProjectSearch.pname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据学生名字查询"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="stuProjectSearch.sname">
        </el-input>
      </div>
      <el-button type="primary" class="searchButton" icon="el-icon-search" size="small" @click="initPositions">查询学生选项目信息</el-button>
    </div>
    <div class="CourseTable">
      <el-table
          size="small"
          :data="positions"
          stripe
          border
          :row-class-name="tableRowClassName"
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
            prop="pname"
            label="项目名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="学生名称"
            width="90">
        </el-table-column>
        <el-table-column
            prop="exam"
            label="审核状态"
            width="80">
        </el-table-column>
        <el-table-column
            prop="applytime"
            label="申请时间"
            :formatter="carTimeFilter"
            width="95">
        </el-table-column>
        <el-table-column
            prop="passtime"
            label="通过时间"
            :formatter="carTimeFilter"
            width="95">
        </el-table-column>

        <!--        操作列-->
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
                @click="handleDelete(scope.$index, scope.row)">退选
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    添加、修改弹出框-->
    <el-dialog
        title="学生选项目管理"
        :visible.sync="dialogVisible"
        width="60%">
      <div>
        <el-form ref="projectForm" :model="stuProject">
          <el-row>
            <el-col :span="24">
              <el-form-item label="审核状态" prop="exam">
                <el-select v-model="stuProject.exam" size="small" style="width: 180px"
                           placeholder="请选择审核状态">
                  <el-option
                      v-for="item in exams"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
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
  name: "StuProject",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible:"",
      addVisible:"",
      selectVisible:"",
      user:{},
      userInfo:{},
      dialogVisible:false,
      stuProject:{
        id:"",
        pid:"",
        sid:"",
        exam:"",
        applytime: "",
        passtime:""
      },
      exams:[
        {
          value: '审核中',
          label: '审核中'
        },
        {
          value: '审核通过',
          label: '审核通过'
        },
        {
          value: '驳回',
          label: '驳回'
        }
      ],
      stuProjectSearch: {
        pname:"",
        sname:""
      },
      positions: [],
      number:[5,10,20],
      pageInfo:{
        total:0,
        startPage:1,
        size:5
      }
    }
  },

  mounted() {
    this.initPositions();
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    doUpdate(){
      this.putRequest("/scientific/updateStuProject", this.stuProject).then(resp => {
        if (resp) {
          this.initPositions();
          this.dialogVisible = false;
        }
      })
    },
    sizeChange(size){
      this.pageInfo.size=size;
      this.initPositions();
    },
    currentChange(currentPage){
      this.pageInfo.startPage=currentPage;
      this.initPositions();
    },
    handleEdit(index, data) {
      Object.assign(this.stuProject, data);
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      if (this.user.mid==null&&data.passtime!=null){
        Message.error({message: '申请成功的项目不可退选哦~'});
      }else{
        this.$confirm('此操作将退选['+data.pname+']项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // alert(data.id)
          this.deleteRequest('/scientific/deleteStuProject/'+data.id).then(resp=>{
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
      }

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
      if (this.user.sid!=null){
        this.getRequest('/scientific/getAllStuProject?startPage='
            +this.pageInfo.startPage+'&size='+this.pageInfo.size
            +'&pname='+this.stuProjectSearch.pname
            +'&sname='+this.stuProjectSearch.sname
            +'&sid='+this.user.sid).then(resp => {
          if (resp) {
            this.positions=resp.data.data;
            this.pageInfo.total=resp.data.total;
          }
        })
      }else{
        this.getRequest('/scientific/getAllStuProject?startPage='
            +this.pageInfo.startPage+'&size='+this.pageInfo.size
            +'&pname='+this.stuProjectSearch.pname
            +'&sname='+this.stuProjectSearch.sname).then(resp => {
          if (resp) {
            this.positions=resp.data.data;
            this.pageInfo.total=resp.data.total;
          }
        })
      }

    },
    carTimeFilter(row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        return moment(daterc).format("YYYY-MM-DD")
      }
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: #fdf5e6;
}

.el-table .success-row {
  background: #f0f9eb;
}

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