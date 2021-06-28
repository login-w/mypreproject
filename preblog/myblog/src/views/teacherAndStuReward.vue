<template>
  <el-tabs type="border-card" v-model="activeName">
    <PersonRewardManage></PersonRewardManage>
  </el-tabs>
</template>

<script>
import PersonRewardManage from "@/reward/PersonRewardManage";

export default {
  name: "TeacherAndStuReward",
  components: {
    PersonRewardManage
  },
  data() {
    return {
      activeName: "PersonRewardManage"
    }
  },
  comments: {
    PersonRewardManage
  }
}
</script>

<style scoped>

</style>