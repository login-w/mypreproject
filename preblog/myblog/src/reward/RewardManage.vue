<template>
  <div>
    <div>
      <div>

      </div>
      <div class="input-search1">
        <el-input
            size="small"
            class="input-search"
            placeholder="根据奖励名称查询"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="rewardSearch.name">
        </el-input>
      </div>
      <el-button type="primary" class="searchButton" icon="el-icon-search" size="small" @click="initPositions">查询奖惩信息
      </el-button>
      <el-button type="warning" size="small"
                 class="AddButton"
                 @click="addReward"
                 :style="{display:addVisible}"
                 icon="el-icon-circle-plus">添加奖惩信息</el-button>
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
            prop="name"
            label="奖惩名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="content"
            label="具体要求"
            width="200">
        </el-table-column>
        <el-table-column
            prop="quota"
            label="名额"
            width="80">
        </el-table-column>
        <el-table-column
            prop="bouns"
            label="奖惩金额"
            width="80">
        </el-table-column>
        <el-table-column
            prop="time"
            :formatter="carTimeFilter"
            label="创建时间"
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
                :style="{display:deleteVisible}"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button
                icon="el-icon-plus"
                size="mini"
                type="success"
                :style="{display: selectVisible}"
                @click="selectReward(scope.$index, scope.row)">申请
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    添加、修改弹出框-->
    <el-dialog
        title="奖惩管理"
        :visible.sync="dialogVisible"
        width="60%">
      <div>
        <el-form ref="teacherForm" :model="rewardMessage">
          <el-row>
            <el-col :span="12">
              <el-form-item label="奖惩名称：" prop="name">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="rewardMessage.name"
                          placeholder="请输入奖惩名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <template>
                <el-form-item label="奖惩内容：" prop="content">
                  <el-input size="small" prefix-icon="el-icon-edit"
                            style="width: 200px" v-model="rewardMessage.content"
                            placeholder="请输入奖惩内容" type="textarea"></el-input>
                </el-form-item>
              </template>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="名 额：" prop="quota">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="rewardMessage.quota"
                          placeholder="请输入名额数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="奖惩金额：:" prop="bouns">
                <el-input size="small" prefix-icon="el-icon-edit" style="width: 200px" v-model="rewardMessage.bouns"
                          placeholder="请输入奖惩金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="创建时间：" prop="time">
                <el-date-picker
                    style="width: 180px"
                    v-model="rewardMessage.time"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
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
  name: "RewardManage",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible:"",
      addVisible:"",
      selectVisible:"",
      user:{},
      userInfo:{},
      rewardMessage:{
        add:"",
        name:"",
        content:"",
        quota:"",
        bouns:"",
        time:"",
        rewardid:"",
        sid:"",
        tid:""
      },
      rewardSearch: {
        name: ""
      },
      positions: [],
      number: [5, 10, 20],
      pageInfo: {
        total: 0,
        startPage: 1,
        size: 5
      },
      dialogVisible :false,
      symbol:false
    }
  },

  mounted() {
    this.initPositions();
  },
  methods: {
    selectReward(index, data){
      Object.assign(this.rewardMessage, data);
      if (this.user.sid!=null){
        this.symbol=true;
        this.rewardMessage.sid=this.user.sid;
        this.rewardMessage.rewardid=data.id;
        this.postRequest("/reward/addStudentReward", this.rewardMessage).then(resp => {
          if (resp){
            this.initPositions();

          }
        })
      }
      if (this.user.tid!=null){
        this.symbol=true;
        this.rewardMessage.tid=this.user.tid;
        this.rewardMessage.rewardid=data.id;
        this.postRequest("/reward/addTeacherReward", this.rewardMessage).then(resp => {
          if (resp){
            this.initPositions();

          }
        })
      }
      if (this.symbol!=true){
        Message.error({message: '权限不足,该操作仅限教师和老师申请'});
      }

    },
    addReward(){
      this.initRewardMessage();
      this.dialogVisible = true;
    },
    initRewardMessage(){
      this.rewardMessage.add="1";
      this.rewardMessage.bouns="";
      this.rewardMessage.content="";
      this.rewardMessage.name="";
      this.rewardMessage.quota="";
      this.rewardMessage.time="";
    },
    doUpdate(){
      if (this.rewardMessage.add == ("1")) {
        this.postRequest("/reward/reward", this.rewardMessage).then(resp => {
          if (resp) {
            this.initPositions();
            this.rewardMessage.add = "";
            this.dialogVisible = false;
          }
        })
      } else {
        this.putRequest("/reward/reward", this.rewardMessage).then(resp => {
          if (resp) {
            this.initPositions();
            this.dialogVisible = false;
          }
        })
      }
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
      Object.assign(this.rewardMessage, data);
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.name + ']奖惩信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // alert(data.id)
        this.deleteRequest('/reward/reward/' + data.id).then(resp => {
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
      this.getRequest('/reward/getAllReward?startPage='
          + this.pageInfo.startPage + '&size=' + this.pageInfo.size
          + '&name=' + this.rewardSearch.name).then(resp => {
        if (resp) {
          this.positions = resp.data.data;
          this.pageInfo.total = resp.data.total;
        }
      })
    },
    init(obj1, obj2) {
      this.positions = obj1;
      this.MyPageInfo = obj2;
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