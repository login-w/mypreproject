<template>
  <div>
    <el-tabs type="border-card" ref="tabs" v-model="activeName">
      <el-tab-pane label="课程管理" name="CourseManage">
        <CourseManage></CourseManage>
      </el-tab-pane>
      <el-tab-pane  label="教师管理"  v-if="displayTeacher" name="TeacherManage">
        <TeacherManage></TeacherManage>
      </el-tab-pane>
      <el-tab-pane label="学院管理" v-if="displayAcademy" name="AcademyManage">
        <AcademyManage></AcademyManage>
      </el-tab-pane>
      <el-tab-pane label="学生管理" v-if="displayStudent" name="StudentManage">
        <StudentManage></StudentManage>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import CourseManage from "@/teach/CourseManage";
import TeacherManage from "@/teach/TeacherManage";
import AcademyManage from "@/teach/AcademyManage";
import StudentManage from "@/teach/StudentManage";
export default {
  name: "基本信息管理",
  components: {AcademyManage, TeacherManage, CourseManage,StudentManage},
  data() {
    return{
      activeName:"CourseManage",
      displayTeacher:true,
      displayAcademy:true,
      displayStudent:true,
      user:{}
    }
  },
  mounted() {
    this.user= window.localStorage.getItem('user');
    this.user=JSON.parse(this.user);
    if (this.user.sid!=null){
      this.displayTeacher=false;
      this.displayAcademy=false;
    }else if(this.user.tid!=null){
      this.displayAcademy=false;
      this.displayTeacher=false;
    }
  },
  comments:{
    CourseManage,
    TeacherManage,
    AcademyManage,
    StudentManage
  }
}
</script>

<style scoped>

</style>