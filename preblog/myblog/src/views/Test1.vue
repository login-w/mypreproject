<template>
  <div>
    <el-tabs  type="card" v-model="activeName" >
      <el-tab-pane label="课程管理" name="CourseManage"><CourseManage></CourseManage></el-tab-pane>
      <el-tab-pane label="教师管理" name="TeacherManage"><TeacherManage></TeacherManage></el-tab-pane>
      <el-tab-pane label="学院管理" name="AcademyManage"><AcademyManage></AcademyManage></el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>

import CourseManage from "@/teach/CourseManage";
import AcademyManage from "@/teach/AcademyManage";
import TeacherManage from "@/teach/TeacherManage";
export default {

  name: "基本信息管理",
  data() {
    return{
      activeName: 'CourseManage'
    }
  },
  components:{
    CourseManage,
    AcademyManage,
    TeacherManage
  }
}
</script>

<style scoped>

</style>