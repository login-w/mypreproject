<template>

<div>
  <el-input
      class="search-input"
      size="small"
      placeholder="请输入查询关键字"
      prefix-icon="el-icon-search"
      v-model="search">
  </el-input>
  <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
</div>
</template>

<script>
  export default {
    name: "CourseManage",
    data(){
      return{
        search:''
      }
    }
  }

</script>

<style scoped>
  .search-input{
    width: 200px;
    margin-right: 8px;
  }
</style>