<template>
  <div>
    <div>
      <div >

      </div>
      <div class="input-search1">
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入课程名称"
            prefix-icon="el-icon-search"
            @keydown.enter.native="searchMessageMethod"
            v-model="searchObj.name">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入课程的编号信息"
            prefix-icon="el-icon-search"
            @keydown.enter.native="searchMessageMethod"
            v-model="searchObj.number">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入任课教师"
            prefix-icon="el-icon-search"
            @keydown.enter.native="searchMessageMethod"
            v-model="searchObj.tname">
        </el-input>
        <el-input
            size="small"
            class="input-search"
            placeholder="请输入学院信息"
            prefix-icon="el-icon-search"
            @keydown.enter.native="searchMessageMethod"
            v-model="searchObj.acaname">
        </el-input>
      </div>
      <el-button type="primary" class="searchButton" icon="el-icon-search" size="small" @click="searchMessageMethod">搜索教师</el-button>
      <el-button type="warning" size="small" class="AddButton" icon="el-icon-circle-plus">添加教师</el-button>
    </div>
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
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="pid"
            label="项目编号"
            width="70">
        </el-table-column>
        <el-table-column
            prop="pname"
            label="项目名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sid"
            label="学生编号"
            width="80">
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
            width="80">
        </el-table-column>
        <el-table-column
            prop="passtime"
            label="通过时间"
            width="80">
        </el-table-column>

        <!--        操作列-->
        <el-table-column label="操作" class="operateColumn" width="200px">
          <template #default="scope">
            <el-button
                icon="el-icon-edit"
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
    <div class="CoursePage">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="MyPageInfo.totalPages">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: "StuProject",
  data() {
    return {
      searchObj: {
      },
      positions: [],
      MyPageInfo: {
        //开始页
        startPage: 1,
        //每页展示的条数
        size: 5,
        //总页数
        totalPages: "",
        //当前页
        curSize: "",
        //总的数据数
        totalItems: ""
      }
    }
  },

  mounted() {
    this.initPositions();
  },
  methods: {
    searchMessageMethod() {
      this.postRequest("/teach/getCourseByFoggy", this.searchObj).then(resp => {
        if (resp) {
          // alert(resp.data.itemList.number);

          this.init(resp.data.itemList,resp.data);
        }
      })
    },
    initSearchObj(obj){
      this.searchObj.acaname=obj;
      this.searchObj.name=obj;
      this.searchObj.number=obj;
      this.searchObj.tname=obj;
    },
    handleEdit(index, data) {

    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除['+data.tname+']教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // alert(data.id)
        this.deleteRequest('/teach/teacher/'+data.id).then(resp=>{
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
      this.postRequest("/scientific/getAllStuProject", this.MyPageInfo).then(resp => {
        if (resp) {
          this.init(resp.data.itemList,resp.data);
        }
      })
    },
    init(obj1,obj2){
      this.positions=obj1;
      this.MyPageInfo=obj2;
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