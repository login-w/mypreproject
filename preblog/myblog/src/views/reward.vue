<template>
  <el-tabs type="border-card" v-model="activeName">
    <RewardManage></RewardManage>
  </el-tabs>
</template>

<script>
import RewardManage from "@/reward/RewardManage";

export default {
  name: "reward",
  components: {
    RewardManage
  },
  data()
  {
    return {
      activeName: "RewardManage"
    }
  },
  comments:{
    RewardManage
  }
}

</script>

<style scoped>

</style>