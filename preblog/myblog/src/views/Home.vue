<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">高校绩效工作量管理系统</div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            <span class="drop-text">{{user.name}}</span>
            <img src="../static/1.jpg">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-submenu index="1" v-for="(item,index) in this .$router.options.routes"
                        :key="index" v-if="!item.hidden">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item :index="children.path"
                            v-for="(children,indexj) in item.children">
                <span>{{children.name}}</span>

              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right"
                         v-if="this.$router.currentRoute.path!='/home'"
                         class="homeRouterView">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div v-if="this.$router.currentRoute.path=='/home'" class="homeWelcome">
            欢迎来到高校绩效工作量管理系统
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      user:JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  methods: {
    menuClick(index) {
      this.$router.push(index);
    },
    commandHandler(command){
      if (command=='logout'){
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清空用户信息
          window.sessionStorage.removeItem("tokenStr");
          window.sessionStorage.removeItem("user");
          this.$router.replace('/');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销登录'
          });
        });

      }

    }
  }
}
</script>

<style scoped>
.homeRouterView{
  margin-top: 10px;
  margin-bottom: 20px;
}
.homeWelcome{
  text-align: center;
  font-size: 30px;
  font-family: 华文行楷;
  color: #409eff;
  padding-top: 100px;
}
.homeHeader {
  background: #212225;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #278842;
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
  font-family: 华文新魏;
  font-size: 20px;
  align-content: center;
  text-align: center;
  color: #11ab99;
}

</style>