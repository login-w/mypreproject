<template>
  <div>

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
            prop="rewardName"
            label="奖惩名称"
            width="120">
        </el-table-column>

        <el-table-column
            prop="bouns"
            label="奖惩金额"
            width="80">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="学生名字"
            width="80">
        </el-table-column>
        <el-table-column
            prop="status"
            label="申请状态"
            width="80">
        </el-table-column>
        <el-table-column
            prop="applytime"
            :formatter="carTimeFilter"
            label="申请时间"
            width="100">
        </el-table-column>
        <el-table-column
            prop="passtime"
            :formatter="carTimeFilter"
            label="通过时间"
            width="100">
        </el-table-column>
        <!--        操作列-->
        <el-table-column label="操作" class="operateColumn" width="280px">
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
        title="学生选奖惩管理"
        :visible.sync="dialogVisible"
        width="60%">
      <div>
        <el-form ref="projectForm" :model="personReward">
          <el-row>
            <el-col :span="24">
              <el-form-item label="审核状态" prop="status">
                <el-select v-model="personReward.status" size="small" style="width: 180px" placeholder="请选择审核状态">
                  <el-option
                      v-for="item in status"
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

import moment from "moment";
import {Message} from "element-ui";

export default {
  name: "PersonRewardManage",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible:"",
      addVisible:"",
      selectVisible:"",
      user:{},
      userInfo:{},
      rewardSearch: {
        name: ""
      },
      status:[
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
      positions: [],
      number: [5, 10, 20],
      pageInfo: {
        total: 0,
        startPage: 1,
        size: 5
      },
      personReward:{
        id:"",
        status:""
      },
      dialogVisible :false
    }
  },

  mounted() {
    this.initPositions();
  },
  methods: {
    doUpdate(){
      this.putRequest("/reward/updateStudentReward", this.personReward).then(resp => {
        if (resp) {
          this.initPositions();
          this.dialogVisible = false;
        }
      })
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
      Object.assign(this.personReward, data);
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      if (this.user.mid==null&&data.passtime!=null){
        Message.error({message: '审核通过的奖惩不能退选哦~'});
      }else{
        this.$confirm('此操作将永久删除[' + data.rewardName + ']奖惩信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // alert(data.id)
          this.deleteRequest('/reward/deleteStudentReward/' + data.id).then(resp => {
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
        this.getRequest('/reward/getAllStudentReward?startPage=' + this.pageInfo.startPage
            + '&size=' + this.pageInfo.size
            +'&sid='+this.user.sid
        ).then(resp => {
          if (resp) {
            this.positions = resp.data.data;
            this.pageInfo.total = resp.data.total;
          }
        })
      }else{
        this.getRequest('/reward/getAllStudentReward?startPage='
            + this.pageInfo.startPage + '&size=' + this.pageInfo.size
        ).then(resp => {
          if (resp) {
            this.positions = resp.data.data;
            this.pageInfo.total = resp.data.total;
          }
        })
      }

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