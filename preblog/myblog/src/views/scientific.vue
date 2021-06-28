<template>
  <el-tabs type="border-card" v-model="activeName">
    <ProjectManage></ProjectManage>
  </el-tabs>
</template>

<script>
import ProjectManage from "@/scientific/ProjectManage";
export default {
  name: "科研管理基本信息",
  components: {ProjectManage},
  data() {
    return{
      activeName:"ProjectManage"
    }
  },
  comments:{
    ProjectManage
  }
}
</script>

<style scoped>

</style>