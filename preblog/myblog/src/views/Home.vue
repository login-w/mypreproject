<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">高校绩效工作量管理系统</div>
        <el-dropdown class="userInfo">
          <span class="el-dropdown-link">
            <span>张三</span>
            <img src="../static/1.jpg">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu @select="menuClick">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-location"></i>导航一</template>
              <el-menu-item index="/test1">选项1</el-menu-item>
              <el-menu-item index="/test2">选项2</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    menuClick(index) {
      this.$router.push(index);
    }
  }
}
</script>

<style scoped>
.homeHeader {
  background: #2b2b2b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #275788;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
}

.el-dropdown-link span {

  padding-right: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: indianred;

}

</style>