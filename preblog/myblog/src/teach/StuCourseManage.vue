<template>
  <div>
    <div>
      <div class="input-search1">
        <el-input
            size="small"
            class="input-search"
            placeholder="根据课程名称查询"
            prefix-icon="el-icon-search"
            style="width: 180px"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="stuCourseSearch.cname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据学生名字查询"
            style="width: 180px"
            clearable
            @clear="initPositions"
            prefix-icon="el-icon-search"
            @keydown.enter.native="initPositions"
            v-model="stuCourseSearch.sname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="根据任课教师查询"
            style="width: 180px"
            prefix-icon="el-icon-search"
            clearable
            @clear="initPositions"
            @keydown.enter.native="initPositions"
            v-model="stuCourseSearch.tname">
        </el-input>
      </div>
      <el-button type="primary"
                 class="searchButton"
                 icon="el-icon-search" s
                 ize="small" @click="initPositions">
        查询学生选课信息
      </el-button>
    </div>
    <div class="CourseTable">
      <el-table
          @selection-change="handleSelectionChange"
          size="small"
          :data="positions"
          stripe
          border
          style="width: 100%">
<!--        <el-table-column-->
<!--            type="selection"-->
<!--            width="55">-->
<!--        </el-table-column>-->
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
            prop="cname"
            label="课程名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="学生姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sidcard"
            label="学生学号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="教师姓名"
            width="120">
        </el-table-column>
        <!--        操作列-->
        <el-table-column label="操作" class="operateColumn" width="200px">
          <template #default="scope">
            <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">退课
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
  name: "StuCourseManage",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible:"",
      addVisible:"",
      selectVisible:"",
      user:{
        sid:null,
        tid:null,
        mid:null
      },
      userInfo:{},
      multipleSelection: [],
      stuCourseSearch: {
        number: null,
        sname: "",
        tname: "",
        cname: ""
      },
      positions: [],
      number: [5, 10, 20],
      pageInfo: {
        total: 0,
        startPage: 1,
        size: 5
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

    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.tname + ']课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.deleteRequest('/teach/deleteStuCourse/' + data.id).then(resp => {
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
      if (this.user.sid==null){
        if (this.user.tid!=null){
          this.getRequest('/teach/getAll?startPage=' + this.pageInfo.startPage
              + '&size=' + this.pageInfo.size + '&cname=' + this.stuCourseSearch.cname
              + '&sname=' + this.stuCourseSearch.sname
              + '&tname=' + this.stuCourseSearch.tname+'&tid='+this.user.tid).then(resp => {
            if (resp) {
              this.positions = resp.data.data;
              this.pageInfo.total = resp.data.total;
            }
          })
        }else{
          this.getRequest('/teach/getAll?startPage=' + this.pageInfo.startPage
              + '&size=' + this.pageInfo.size + '&cname=' + this.stuCourseSearch.cname
              + '&sname=' + this.stuCourseSearch.sname
              + '&tname=' + this.stuCourseSearch.tname).then(resp => {
            if (resp) {
              this.positions = resp.data.data;
              this.pageInfo.total = resp.data.total;
            }
          })
        }

      }else{
        this.getRequest('/teach/getAll?startPage=' + this.pageInfo.startPage
            + '&size=' + this.pageInfo.size + '&cname=' + this.stuCourseSearch.cname
            + '&sname=' + this.stuCourseSearch.sname
            + '&tname=' + this.stuCourseSearch.tname
            +'&sid='+this.user.sid).then(resp => {
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