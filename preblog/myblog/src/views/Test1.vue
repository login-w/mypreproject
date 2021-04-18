<template>
  <div>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="课程管理" name="one">课程管理</el-tab-pane>
      <el-tab-pane label="教师管理" name="two">教师管理</el-tab-pane>
      <el-tab-pane label="学院管理" name="third">学院管理</el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import CourseManage from "@/teach/CourseManage";
export default {
  name: "基本信息管理",
  data() {
    return{
      activeName:"one"
    }
  }
}
</script>
<script>

</script>

<style scoped>

</style>