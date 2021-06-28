<template>
<AchievementManage></AchievementManage>
</template>

<script>
import AchievementManage from "@/achievement/AchievementManage";

export default {
  name: "achievementPerson",
  components: {AchievementManage},
  data() {
    return {
      activeName: "achievementPerson"
    }
  },
  comments: {
    AchievementManage
  }
}
</script>

<style scoped>

</style>