<template>
  <div>
    <!--    表格数据-->
    <div class="CourseTable">
      <el-table
          size="small"
          :data="achieveData"
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
        <el-table-column
            prop="id"
            label="数据编号"
            width="85">
        </el-table-column>
        <el-table-column
            prop="idcard"
            label="职工号"
            width="90">
        </el-table-column>
        <el-table-column
            prop="name"
            label="教师姓名"
            width="90">
        </el-table-column>
        <el-table-column
            prop="courseCount"
            label="教学绩效分"
            width="90">
        </el-table-column>
        <el-table-column
            prop="courseResult"
            label="教学考核结果"
            width="120">
        </el-table-column>
        <el-table-column
            prop="projectCount"
            label="指导项目绩效分"
            width="120">
        </el-table-column>
        <el-table-column
            prop="projectResult"
            label="指导项目考核结果"
            width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="course">如有异议，请联系管理员13323027661</div>
  </div>


</template>

<script>
export default {
  name: "AchievementManage",
  data() {
    return {
      editVisible: '',   //显示、隐藏
      deleteVisible: "",
      addVisible: "",
      selectVisible: "",
      user: {},
      userInfo: {},
      achieveData: {}
    }
  },
  mounted() {
    this.initPositions();
  },
  methods: {
    initPositions() {
      this.user = window.localStorage.getItem('user');
      this.user = JSON.parse(this.user);
      if (this.user.mid!=null){
        this.userInfo=this.user.managerInfo;
      }
      // alert(JSON.stringify(this.user));
      if (this.user.authority!=1){
        this.editVisible='none';
        this.addVisible='none';
        this.deleteVisible='none';
      }
      if (this.user.tid != null) {
        this.getRequest('/achievement/getAchievementById?tid=' + this.user.tid).then(resp => {
          if (resp) {
            this.achieveData = resp.data;
          }
        })
      } else {
        this.getRequest('/achievement/getAllAchievements').then(resp => {
          if (resp) {
            this.achieveData = resp.data;
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.course {
  margin-top: 20px;
  font-size: 15px;
  font-family: 华文行楷;
  color: #7e7f80;
}
</style>