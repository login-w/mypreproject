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
      <el-button type="primary" class="searchButton" icon="el-icon-search" size="small" @click="searchMessageMethod">搜索课程</el-button>
      <el-button type="warning" size="small" class="AddButton" icon="el-icon-circle-plus">添加课程</el-button>
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
            prop="name"
            label="学生姓名"
            width="95">
        </el-table-column>
        <el-table-column
            prop="birth"
            label="生日"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="70">
        </el-table-column>
        <el-table-column
            prop="acaid"
            label="所属学院id"
            width="90">
        </el-table-column>
        <el-table-column
            prop="specialid"
            label="专业"
            width="70">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="住址"
            width="95">
        </el-table-column>
        <el-table-column
            prop="tid"
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
  name: "StudentManage",
  data() {
    return {
      searchObj: {
        id:"",
        name: "",
        number: "",
        tname: "",
        acaname: ""
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
      this.postRequest("/teach/getStudentByFoggy", this.searchObj).then(resp => {
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
      this.$confirm('此操作将永久删除['+data.name+']学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // alert(data.id)
        this.deleteRequest('/teach/student/'+data.id).then(resp=>{
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
      this.postRequest("/teach/getAllStudent", this.MyPageInfo).then(resp => {
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