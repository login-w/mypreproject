<template>
  <div>
    <el-tabs type="border-card" v-model="activeName">
      <StuCourseManage></StuCourseManage>
    </el-tabs>
  </div>
</template>

<script>
import StuCourseManage from "@/teach/StuCourseManage";
export default {
  name: "选课信息",

  components: {StuCourseManage},
  data() {
    return{
      activeName:"StuCourseManage"
    }
  },
  comments:{
    StuCourseManage
  }
}
</script>

<style scoped>

</style>