<template>
<!--  <div>绩效管理评分细则</div>-->
  <div>
    <el-table
        :data="tableData"
        style="width: 74%">
        <el-table-column style="grid-column-end: auto" label="绩效管理评分细则">
          <el-table-column
              prop="name"
              label="考核内容"
              width="150">
          </el-table-column>
          <el-table-column
              prop="value"
              label="考核标准"
              width="150">
          </el-table-column>
          <el-table-column
              prop="qualified"
              label="合格绩效"
              width="150">
          </el-table-column>
          <el-table-column
              prop="good"
              label="良好绩效"
              width="150">
          </el-table-column>
          <el-table-column
              prop="excellent"
              label="优秀绩效"
              width="150">
          </el-table-column>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AchievementDetail",
  data() {
    return {
      tableData:[{
        name: '授课',
        value:"0.1/节课",
        qualified:"2.6",
        good:"6",
        excellent:"12"
      },{
        name: '指导项目',
        value:"0.3/项目",
        qualified:"0.3",
        good:"0.9",
        excellent:"1.5"
      }
      ]
    }

  }
}
</script>

<style scoped>

</style>