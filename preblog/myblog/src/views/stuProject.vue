<template>
<StuProject></StuProject>
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