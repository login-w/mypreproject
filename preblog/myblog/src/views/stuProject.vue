<template>
  <el-tabs type="border-card" v-model="activeName">
    <StuProject></StuProject>
  </el-tabs>
</template>

<script>
import StuProject from "@/scientific/StuProject";
export default {
  name: "科研管理基本信息",
  components: {StuProject},
  data() {
    return{
      activeName:"StuProject"
    }
  },
  comments:{
    StuProject
  }
}
</script>

<style scoped>

</style>