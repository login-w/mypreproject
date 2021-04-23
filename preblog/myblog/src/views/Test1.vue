<template>
  <div>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="课程管理" name="CourseManage">
        <CourseManage></CourseManage>
      </el-tab-pane>
      <el-tab-pane label="教师管理" name="TeacherManage">
        <TeacherManage></TeacherManage>
      </el-tab-pane>
      <el-tab-pane label="学院管理" name="AcademyManage">
        <AcademyManage></AcademyManage>
      </el-tab-pane>
      <el-tab-pane label="学生管理" name="StudentManage">
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
      activeName:"CourseManage"
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