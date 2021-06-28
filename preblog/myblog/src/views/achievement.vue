<template>
  <AchievementDetail></AchievementDetail>
</template>

<script>
import AchievementDetail from "@/achievement/AchievementDetail";


export default {
  name: "achievement",
  components: {AchievementDetail},
  data() {
    return {
      activeName: "AchievementDetail"
    }
  },
  comments: {
    AchievementDetail
  }
}
</script>

<style scoped>

</style>